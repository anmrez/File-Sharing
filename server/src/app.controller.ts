import { Body, Controller, Get, Post } from '@nestjs/common';
import { IChangePassword, AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(
    private authService: AuthService
  ) {}

  @Post()
  changePassword(
    @Body() hashes: IChangePassword
  ){
    
    console.log( hashes )
    this.authService.changePassword( hashes )

  }
}
