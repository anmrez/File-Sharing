import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertComponent } from "../components/alert/alert.component";



@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private alertCallMethodSource = new Subject<any>();
  alertCallMethod$ = this.alertCallMethodSource.asObservable()

  constructor(  ){  }


  show( message: string, status: string ){

    let data = {
      message: message,
      status: status
    }
    this.alertCallMethodSource.next( data )

  }

}