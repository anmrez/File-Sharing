import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";


@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_PASSWORD,
        signOptions: { expiresIn: '5m' },
      })
    }),

    PassportModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
  ],
  controllers: []
})
export class AuthModule {}