import { Component, Input, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'infinityIcon',
  templateUrl: './infinity-icon.component.html',
})
export class InfinityIconComponent implements OnInit {

  infinity: boolean = false
  animate: string = '0'
  @Input() data: number | string | undefined

  constructor() { }
  
  ngOnInit(){
    
    if ( this.data === -1 ) this.infinity = true

    let source = interval( 20 );
    const subscribe = source.subscribe( val => this.animate = -val + '' );

  }

}
