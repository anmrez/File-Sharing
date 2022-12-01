import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";



@Injectable()
export class JwtAuthGuard extends AuthGuard( 'jwt' ){

  constructor( private reflector: Reflector ) {
    super();
  }

  getRequest( context: ExecutionContext ){

    // console.log( 'try connect...' )
    const ctx = GqlExecutionContext.create( context )
    // console.log( ctx.getContext().req.headers["authorization"] )
    return ctx.getContext().req

  }

}