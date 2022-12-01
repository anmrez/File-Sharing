import { Component, Input } from '@angular/core';

@Component({
  selector: 'updateButton',
  templateUrl: './update-button.component.html',
})
export class UpdateButtonComponent {

  
  @Input() updateFiles: any


}
