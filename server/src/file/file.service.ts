import { HttpException, Injectable } from '@nestjs/common';
import { FileDto } from './dto/file.dto';
import { FileEntity } from './file.entity';
import * as path from 'path';
import * as fs from 'fs';
import { interval } from 'rxjs';


export interface IResponse {
  status: number
  message: string
}

export interface IBody {
  name: string
  description: string
  number_downloads: string | number
  storage_hour: number
}

@Injectable()
export class FileService {


  files: {
    name: string
    description: string
    number_downloads: number
    storage_time: Date
  }[] = []


  constructor(){

    this.removeAllFiles()

    interval( 60_000 ).subscribe( () => {
      this.checkingFilesExpirationDate( )
    })

  }


  async create( fileDto: FileDto ): Promise < FileEntity | null >{

    let verificationExistence = this.verificationExistence( fileDto.name )
    if ( verificationExistence ) throw new HttpException( 'The file already exists', 500 );

    if ( fileDto.number_downloads === undefined ) fileDto.number_downloads = -1
    if ( fileDto.storage_hour ) {
      fileDto.storage_time = this.setTime( fileDto.storage_hour )
    } else {
      fileDto.storage_time = new Date( 0 )
    }

    return this.saveFile( fileDto )

  }


  async writeFile( fileData: any ){

    let filepath = this.getFilePath( fileData.originalname )
    let fileContent = fileData.buffer
    fs.writeFile( filepath, fileContent, ( err ) => {
      if ( err ) throw err
    }); 
    return null

  }


  async getAll(): Promise < FileEntity[] | null >{

    if ( this.files.length === 0 ) return null

    let files: any[] = []
    for ( let i = 0; i < this.files.length; i++ ) {

      let file = this.files[ i ];
      if ( file.number_downloads !== 0 ) files.push( file )
      
    }

    return files

  }


  download( fileName: string ) {

    let index = this.getFileByName( fileName )
    
    if ( index === undefined ) return

    if ( this.files[ index ].number_downloads === -1 ) return
    if ( this.files[ index ].number_downloads === 0 ) this.delete( fileName )
    if ( this.files[ index ].number_downloads >= 1 ) this.files[ index ].number_downloads -= 1

  }


  async delete( fileName: string ): Promise< IResponse > {

    console.log( `=== DELETE ===` )
    let filePath = this.getFilePath( fileName )
    console.log( filePath )

    fs.unlink( filePath, function( err ) {

      if ( err && err.code === 'ENOENT' ) console.log( `[Error] - File '${ fileName }' not found from FS` )
      if ( err && err.code !== 'ENOENT' ) return {
        status: 500,
        message: err.message
      }

    })
    
    this.deleteFileByName( fileName )
    return {
      status: 200,
      message: `File: '${ fileName }' successfully deleted`
    }

  }


  validateBody( body: IBody | FileDto, fileName: string ): { 
    body: FileDto,
    fileName: string
  }{

    if ( body.name === '' ) {
      body.name = fileName
    } else {
      fileName = body.name
    }

    if ( body.number_downloads === '' || body.number_downloads === 0 ) {
      body.number_downloads = -1
    } else {
      body.number_downloads = Number( body.number_downloads )
    }

    body.storage_hour = Number( body.storage_hour )

    return {
      body: < FileDto >body,
      fileName: fileName
    }

  }

  // === private ===

  // private async checkingSizeFiles( ){
  //   let mainFilder = path.join( process.cwd(), 'files' )
  //   let folderSize: number = 0
  //   let files = fs.readdirSync( mainFilder )
  //   for ( let i = 0; i < files.length; i++ ) {
  //     let fileName = files[ i ];
  //     let filePath = path.join( mainFilder, fileName )
  //     let fileStat = fs.statSync( filePath );
  //     console.log( fileStat.size )
  //     folderSize += fileStat.size
  //   }
  //   let freeSpace = this.limitSize - folderSize
  //   console.log( 'folderSize: ' + folderSize )
  //   console.log( 'freeSpace: ' + freeSpace )
  // }

  
  private async checkingFilesExpirationDate(  ){

    console.log( `=== checkingFilesExpirationDate ===` )
    let nowDate = new Date().getTime()
    let allFiles = this.files
    let infinityDate = new Date( 0 ).getTime()

    if ( allFiles )
      for ( let i = 0; i < allFiles.length; i++ ) {

        let file = allFiles[i]
        let fileDate = file.storage_time.getTime()

        if ( file.number_downloads === 0 ) this.delete( file.name )

        if ( fileDate === infinityDate ) break
        if ( nowDate > fileDate ) this.delete( file.name ) 
              
      }

  }


  private setTime( hours: number ): Date {

    let now = new Date()
    let nowHours = now.getHours()
    let newHours = hours + nowHours
    let newDate = new Date( now.setHours( newHours ) )

    return newDate

  }

  
  private verificationExistence( fileName: string ): boolean {

    let pathUpload = this.getFilePath( fileName )
    if ( fs.existsSync( pathUpload ) ) return true

    return false

  }


  private getFilePath( fileName: string ): string {

    let filePath = path.join( process.cwd(), 'files', fileName ) 

    return filePath

  }


  private getFileByName( name: string ){

    let length = this.files.length

    for ( let i = 0; i < length; i++ ) {
      
      let file = this.files[i];
      let fileName = file.name
      if ( fileName === name ) return i
      
    }

  }


  private saveFile( fileEntity: FileDto ): FileEntity{

    let length = this.files.length
    let file: FileEntity = {
      name: fileEntity.name,
      description: fileEntity.description,
      number_downloads: -1,
      storage_time: new Date(0)
    }

    if ( fileEntity.number_downloads !== undefined ) file.number_downloads = fileEntity.number_downloads
    if ( fileEntity.storage_time !== undefined ) file.storage_time = fileEntity.storage_time

    return this.files[ length ] = file

  }


  private deleteFileByName( name: string ){

    let length = this.files.length

    for ( let i = 0; i < length; i++ ) {
      
      let file = this.files[ i ];
      if ( file.name === name ) {

        this.files.splice( i, 1 )
        return

      }

      
    }

  }


  private removeAllFiles (){

    let folderFiles = path.join( process.cwd(), 'files' ) 

    fs.readdir( folderFiles, ( err, files ) => {

      if ( err ) console.log( err )
      if ( !err ) files.forEach( file => {
        this.delete( file )
      })

    })

  }


}
