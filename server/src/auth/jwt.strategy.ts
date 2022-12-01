
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PASSWORD,
      logging: true
    });
  }

  validate( payload: any ) {

    // console.log( `JwtStrategy validate: ` )
    // console.log( payload )
    return payload.id

  }

}