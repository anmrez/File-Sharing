import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { interval } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

export interface IFile {

  name: string
  description: string
  number_downloads: number
  storage_time: Date | string

}


@Component({
  selector: 'menu',
  templateUrl: 'menu.component.html',
})
export class MenuComponent implements OnInit {

  intreval$: any
  isConnected: boolean | string = 'loading'
  isFiles: boolean = false
  files: IFile[] = []
  timeFile: ( string | number )[] = []

  displayedColumns: string[] = ['Name', 'Description', 'Number downloads', 'Store time', 'Download', 'Delete']

  isUpload: boolean = false

  screenWidth: number = 0
  isMobile: boolean = false

  constructor(
    private graphqlService: GraphqlService,
    private uploadService: UploadService,
  ){

    this.getFiles()
    
  }
  

  getFiles(){
    
    this.graphqlService.getFiles()
    
  }


  onResize(){

    this.screenWidth = document.body.clientWidth;
    if ( this.screenWidth < 950 ) this.isMobile = true
    if ( this.screenWidth > 950 ) this.isMobile = false

    let container: HTMLElement | null = document.querySelector( '#conteinerFilesOnMobile' )
    if ( container ) container.style.height = document.body.clientHeight - 145 + 'px'

  }


  showFileOnMobile( index: number ){

    let container = document.querySelector( '#conteinerFilesOnMobile' )
    let children = container?.children

    this.hiddenAllFileOnMobile( children )

    if ( children === undefined ) return
    let targetFile = children[ index ]
    
    let optionTargetFile = targetFile.querySelector( '#fileOptions' )
    optionTargetFile?.classList.add( 'h-full' )
    optionTargetFile?.classList.remove( 'h-0' )

  }

  hiddenAllFileOnMobile( files: HTMLCollection | undefined ){

    if ( files )
      for ( let i = 1; i < files.length; i++ ) {
        
        let file = files[i];
        let optionFile = file.querySelector( '#fileOptions' )
        if ( optionFile ) this.hiddenFileOnMobile( optionFile )
        
      }

  }

  hiddenFileOnMobile( optionFile: Element ){

    optionFile.classList.remove( 'h-full' )
    optionFile.classList.add( 'h-0' )

  }


  // private ====


  ngOnInit(){

    this.updateData()
    this.onResize()

    let stream$ = interval( 1000 ).subscribe( () => {
      let container: HTMLElement | null = document.querySelector( '#conteinerFilesOnMobile' )
      if ( container ) {
        container.style.height = document.body.clientHeight - 145 + 'px'
        stream$.unsubscribe()
      }
    })
    
  }
  

  ngOnDestroy(){

    this.intreval$.unsubscribe()

  }

  showUpload(){

    this.uploadService.show()

  }


  private updateData(){

    this.intreval$ = interval( 1000 ).subscribe(() => {

      this.files = this.graphqlService.files
      this.timeFile = this.graphqlService.timeFile
      this.isConnected = this.graphqlService.isConnected
      this.isFiles = this.graphqlService.isFiles

    })

  }

}
