import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



@Injectable({
  providedIn: 'root',
})
export class UploadService{

  private uploadScreenSourse = new Subject< boolean >()
  uploadScreen$ = this.uploadScreenSourse.asObservable()


  show(){

    this.uploadScreenSourse.next( true )
    
  }
  
  hidden(){
    
    this.uploadScreenSourse.next( false )

  }

}