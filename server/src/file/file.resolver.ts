import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileDeleteOutput } from './dto/file-delete-output';
import { FileOutput } from './dto/file.output';
import { FileEntity } from './file.entity';
import { FileService, IResponse } from './file.service';

@Resolver()
export class FileResolver {

  constructor( 
    private fileService: FileService
  ){}


  @Mutation( returns => FileDeleteOutput )
  @UseGuards( JwtAuthGuard )
  deleteFile( @Args( 'fileName' ) fileName: string ): Promise< IResponse > {

    console.log( `mutation delete file: '${ fileName }'` )
    return this.fileService.delete( fileName )

  }


  @Query( () => [FileOutput], { description: 'get list of files', nullable: true, name: 'files' } )
  @UseGuards( JwtAuthGuard )
  getListOfFiles(): Promise < FileEntity[] | null > {

    return this.fileService.getAll()

  }



  
}
