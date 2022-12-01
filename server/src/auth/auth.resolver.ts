import { AuthService } from './auth.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {

  constructor(
    private authService: AuthService
  ){}

  @Mutation( returns => String )
  login( @Args( 'password' ) password: string ) {

    let response: string = this.authService.validateHash( password )
    return response

  }
  

}
