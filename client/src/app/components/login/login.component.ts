import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { SHA3 } from 'sha3'
import { LOGIN } from 'src/app/graphql.quires';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {

  password: string = ''
  hashPassword: string = ''
  isFail: boolean = false

  constructor(
    private apollo: Apollo,
    private router: Router,
    private headerService: HeaderService,
  ){}

  login( inputPassword: string ){

    this.hashPassword = this.hashingPassword( inputPassword )
    this.sendPassword()
    
  }

  
  private hashingPassword( password: string ): string {
    
    let hash = new SHA3( 512 );
    hash.update( password );
    return hash.digest( 'hex' );

  }


  private sendPassword( ){

    let pass = this.hashPassword

    let loginQuery$ = this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        pass
      }
    })
    .subscribe(
      ( {data}: any ) => {
        
        if ( data.login !== 'fail' ) this.redirect( data )
        if ( data.login === 'fail' ) this.showAlert()

      },
      ( error: any ) => {
        console.log( error.message )
      }
    )


  }


  private redirect( data: any ){

    this.headerService.set( data.login )
    this.router.navigate( [''] )
    this.isFail = false

  }
  

  private showAlert(){

    this.isFail = true


  }


}
