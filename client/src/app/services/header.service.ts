import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
  providedIn: 'root',
})
export class HeaderService{

  header: HttpHeaders | undefined
  headerString: string = ''

  set( token: string ){

    this.header = new HttpHeaders().set( "Authorization", "Bearer " + token )
    this.headerString = "Bearer " + token

  }

  get(): HttpHeaders | undefined {

    return this.header

  }

}