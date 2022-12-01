import { Component, HostListener, Input, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { HeaderService } from 'src/app/services/header.service';
import { UploadService } from 'src/app/services/upload.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {

  isUpload: boolean = false
  actionUrl: string = ''

  constructor(
    private uploadService: UploadService,
    private alertService: AlertService,
    private headerService: HeaderService,
  ) {

    this.actionUrl = environment.ipServer + '/upload'

  }

  ngOnInit(): void {

    this.uploadService.uploadScreen$.subscribe( ( val: boolean ) => {
      this.isUpload = val
      window.location.hash = '#upload'
    })
    
  }


  @HostListener( 'document:keydown', [ '$event' ] )
  keyDownEsk( event: KeyboardEvent ) {

    if ( event.key === 'Escape' ) this.hidden()
    
  }


  @HostListener( 'window:hashchange', [ '$event' ] )
  hashChangeHandler( e: any ) {

    let hash = window.location.hash 
    if ( hash === '' ) this.hidden()

  }

  
  async onSubmit( event: any){

    event.preventDefault()

    let form = event.target

    let response = await fetch( this.actionUrl, {
      method: 'POST',
      headers: {
        Authorization: this.headerService.headerString
      },
      body: new FormData( form )
    });

    let result = await response.json();

    let status: string = 'red'
    if ( result.status === 'success' ) {
      status = 'green' 
      window.location.hash = ''
      this.hidden()
    } 
    this.alertService.show( result.message, status )

  }


  clickScreen( event: any ){

    if ( event.target.id === 'uploadScreen' ) this.hidden()

  }


  hidden(){

    this.isUpload = false

  }


  chooseFile(){

    let input: HTMLElement | null = document.querySelector( '#uploadFile' )
    input?.click()

  }


  changeFile( event: any ){

    let input = document.querySelector( '#uploadFileInputName' ) as HTMLTextAreaElement
    if ( input ) input.value = event.target.files[0].name
    
    let choosedFileSection = document.querySelector( '#choosedFileSection' )
    choosedFileSection?.classList.remove( 'hidden' )

    let choosedFileName: HTMLElement | null = document.querySelector( '#choosedFileName' )
    if ( choosedFileName ) choosedFileName.innerHTML = event.target.files[0].name

  }


  validateInput( input: any ){

    let reg = new RegExp( '[^\\d]', 'g' )
    let valueNumber = input.value.replace( reg,'' )
    input.value = valueNumber

  }


}
