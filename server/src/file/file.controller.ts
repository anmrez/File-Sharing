import { Body, Controller, Get, Param, Post, Res, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs'
import * as path from 'path'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileDto } from './dto/file.dto';
import { FileService, IBody } from './file.service';

@Controller()
export class FileController {

  constructor(
    private fileService: FileService
  ){}

  @Get( 'download/:file' )
  @UseGuards( JwtAuthGuard )
  async download(
    @Param() params: any,
  ): Promise < StreamableFile > {

    let fileName = params.file
    let pathToFile = path.join( process.cwd(), 'files', fileName ) 
    let file = fs.createReadStream( pathToFile );

    this.fileService.download( fileName )

    return new StreamableFile( file );

  }


  @Post( 'upload' )
  @UseGuards( JwtAuthGuard )
  @UseInterceptors( FileInterceptor('file') )
  async upload(
    @UploadedFile() file: any,
    @Body() body: IBody | FileDto
  ){

    let validate = this.fileService.validateBody( body, file.originalname )
    body = validate.body
    file.originalname = validate.fileName

    await this.fileService.create( body )

    let writeFile = await this.fileService.writeFile( file )
    if ( writeFile ) return {
      status: 'error',
      message: 'Failed to write file'
    }

    return {
      status: 'success',
      message: `File '` + file.originalname + `' uploaded`
    }

  }


}
