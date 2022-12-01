import { Injectable } from "@nestjs/common"
import { SHA3 } from 'sha3'
import { JwtService } from '@nestjs/jwt';

export interface IChangePassword {
  oldPasswordHash: string,
  newPasswordHash: string
}

@Injectable()
export class AuthService {

  password: string = String( process.env.PASSWORD )
  hashPassword: string

  constructor(
    private readonly jwtService: JwtService
  ){

    this.hashPassword = this.hashingPassword()

  }


  hashingPassword(): string{

    let hash = new SHA3( 512 );
    hash.update( this.password );
    return hash.digest( 'hex' );

  }

  
  changePassword( hashes: IChangePassword ) {

    console.log( 'current: ' + this.hashPassword )
    console.log( 'old:     ' + hashes.oldPasswordHash )
    console.log( 'new:     ' + hashes.newPasswordHash )

  }


  validateHash( userHash: string ): string {

    let userId = String( new Date().getTime() )
    let access_token = this.jwtService.sign({
      id: userId
    })

    if ( this.hashPassword === userHash ) return access_token
    // if ( this.hashPassword === userHash ) return 'success'
    return 'fail'

  }


}