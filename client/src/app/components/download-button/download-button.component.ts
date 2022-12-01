import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { HeaderService } from 'src/app/services/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'downloadButton',
  templateUrl: './download-button.component.html',
})
export class DownloadButtonComponent {

  @Input() fileName: string = ''
  @Input() isMobile: boolean = false

  constructor(
    private http: HttpClient,
    private headerService: HeaderService,
    private alertService: AlertService,
  ){}

  getFile(){

    let url = environment.ipServer +  '/download/' + this.fileName
    let jwtHeader = this.headerService.get()

    this.http.get( url, { 
      headers: jwtHeader, 
      responseType: 'arraybuffer' 
    }).subscribe( 
      ( data: any ) => {

        let blob = new Blob( [data] );

        let link = document.createElement( 'a' )
        link.href = window.URL.createObjectURL( blob );
        link.download = this.fileName
        link.click()

      },
      ( error: any ) => {

        if ( error.status === 400 ) this.alertService.show( 'File not found!', 'red' )

      }
    )

  }

}
