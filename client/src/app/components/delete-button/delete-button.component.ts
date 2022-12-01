import { GraphqlService } from '../../services/graphql.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'deleteButton',
  templateUrl: './delete-button.component.html',
})
export class DeleteButtonComponent {

  @Input() fileName: string =''
  @Input() isMobile: boolean = false

  constructor(
    private graphqlService: GraphqlService,
  ){}

  
  deleteFile(){
    
    this.graphqlService.deleteFile( this.fileName )

  }

}
