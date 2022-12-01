import { Component, Input } from '@angular/core';

@Component({
  selector: 'file',
  templateUrl: 'file.component.html',
})
export class FileComponent {

  @Input() file: any

  constructor(){

    // this.file = {
    //   name: `api.ts`,
    //   description: 'my first file',
    //   number_download: 2,
    //   store_time: '5 hours'
    // }

  }

}
