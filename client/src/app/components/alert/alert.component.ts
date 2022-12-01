import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {

  message: string = ''
  status: string = 'red'
  isHidden: boolean = true
  streamAlert$ = this.alertService.alertCallMethod$
  alertContainer: HTMLElement | null = null

  constructor(
    private alertService: AlertService
  ){ 
    
    this.streamAlert$.subscribe( ( data: { message: string, status: string }) => {
      
      this.createAlert( data.message, data.status )

    })
    
  }

  ngOnInit(){

    this.alertContainer = document.querySelector( '#alertContainer' )

  }


  createAlert( message: string, status: string ){

    let alert = document.createElement( 'p' )
    this.addStyles( alert, status )

    alert.innerHTML = message
    this.alertContainer?.append( alert )

    this.showAlert( alert )

  }


  addStyles( element: HTMLParagraphElement, status: string ){

    let styles = [
      'w-[300px]',
      'min-h-[50px]',
      'px-4',
      'py-2',
      'font-bold',
      'text-white',
      'text-sm',
      'flex',
      'items-center',
      'rounded-r-lg',
      'left-[-300px]',
      'relative',
      'duration-500',
      'z-20',
    ]

    if ( status === 'green' ) {
      styles.push( 'bg-greenAlert' )
    } else {
      styles.push( 'bg-redAlert' )
    }

    styles.forEach( style => {
      element.classList.add( style )
    })


  }


  showAlert( element: HTMLParagraphElement ){

    timer( 100 ).subscribe( () => { 
      element.classList.add( 'left-0' )
      element.classList.remove( 'left-[-300px]' )
    })

    this.deleteAlertByTimer( element )

  }


  deleteAlertByTimer( element: HTMLParagraphElement ){

    timer( 8_000 ).subscribe( () => {

      element.classList.remove( 'left-0' )
      element.classList.add( 'left-[-300px]' )

      timer( 1_000 ).subscribe( () => { element.remove() })

    })

  }

  // deletAlertByClick(){



  // }
  

}
