import * as path from 'path'
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './file/file.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join( process.cwd(), 'src/schema.gql' ),
      // sortSchema: true,
      debug: false,
      playground: false,
    }),


    FileModule,

    AuthModule,

  ],


  // controllers: [
  // ],
  // providers: [
    // AppService,
  // ],


})
export class AppModule {}
