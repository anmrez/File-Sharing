import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { DELETE_FILE, GET_FILES } from '../graphql.quires';
import { AlertService } from './alert.service';
import { FileTimeService } from './fileTime.service';
import { HeaderService } from './header.service';

export interface IFile {

  name: string
  description: string
  number_downloads: number
  storage_time: Date | string

}


@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  
  fileGet$ : any
  files: IFile[] = []
  timeFile: ( string | number )[] = []
  
  isConnected: boolean = false
  isFiles: boolean = false

  constructor(
    private router: Router,
    private apollo: Apollo,
    private headerService: HeaderService,
    private fileTimeService: FileTimeService,
    private alertService: AlertService,
  ){}


  getFiles(){

    this.fileGet$ = this.apollo.watchQuery<any>({
      query: GET_FILES,
      context:{
        headers: this.headerService.get()
      },
      pollInterval: 10_000
    })
    .valueChanges.subscribe( 
      ( { data }: any ) => {

        this.files = []
        this.timeFile = []
        this.fileTimeService.timeFile = []
        this.fileTimeService.timeLifeFile = []

        this.isConnected = true
        
        if ( data.files === null ) return
        this.isFiles = true
        
        this.files = data.files;
        this.files.forEach( ( file: IFile ) => {

          this.fileTimeService.set( file.storage_time )
          this.timeFile = this.fileTimeService.timeFile

        });

        // console.log( this.fileTimeService.timeFile )
        this.fileTimeService.update()
        this.fileTimeService.updateInterval(  )

      },
      ( error: any ) => {

        // console.log( '[Error] - ' + error.message )
        if ( error.message === 'Unauthorized' ) {
          
          this.router.navigate(['/login'])
        } 

        this.isConnected = false

      },

    )

  }


  deleteFile( fileName: string ){

    // console.log( 'delete file: ' + fileName )
    this.apollo.mutate({
      mutation: DELETE_FILE,
      context:{
        headers: this.headerService.get()
      },
      variables: {
        fileName: fileName,
      },
    })
    .subscribe(
      ( data: any ) => {

        let response = data.data.deleteFile
        let status: string = 'red'
        
        if ( response.status === 200 ) status = 'green'
        this.alertService.show( response.message, status )

      },
      ( error: any ) => {

        this.alertService.show( error.message, 'red' )

      }
    );
  

  }

}