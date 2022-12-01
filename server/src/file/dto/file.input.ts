import { Field, InputType } from "@nestjs/graphql"

@InputType({ description: 'create file' })
export class FileInput{

  @Field()
  name: string

  @Field()
  description: string

  @Field({ nullable: true })
  number_downloads?: number

  @Field({ nullable: true, description: 'storage time ( in hours )' })
  storage_hour?: number
  

}