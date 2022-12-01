import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'descriptionFile',
  templateUrl: './description-file.component.html',
})
export class DescriptionFileComponent implements OnInit {

  @Input() content: string = ''
  isLongContent: boolean = false
  shortContent: string = ''
  isMouseEnter: boolean = false
  descriptionElement: any

  constructor() {}
  
  ngOnInit(): void {
    
    if ( this.content.length >= 60 ) this.isLongContent = true
    if ( this.isLongContent ) this.shortContent = this.content.substring( 0, 60 ) + '...'
    if ( this.shortContent ) this.createDescriptionElement()
    
  }
  
  createDescriptionElement(){
    
    this.descriptionElement = document.createElement( "p" )
    this.descriptionElement.innerHTML = this.content
    this.descriptionElement.style.display = 'none'
    this.descriptionElement.style.width = '300px'
    this.descriptionElement.classList.add( 
      'bg-main3', 
      'px-4', 
      'py-2', 
      'absolute',
      'pointer-events-none',
      'opacity-80',
      'text-sm',
    )
    document.body.append( this.descriptionElement );

  }

  mouseLeave(){

    if ( this.isLongContent ) this.descriptionElement.style.display = 'none'

  }

  @HostListener( 'mousemove', ['$event'] )
  onMousemove( event: MouseEvent ) {

    if ( this.isMouseEnter ) {
      
      let x = event.clientX
      let y = event.clientY

      this.descriptionElement.style.display = 'block'
      this.descriptionElement.style.left = x + 'px'
      this.descriptionElement.style.top = y + 'px'

    }

  }

}
