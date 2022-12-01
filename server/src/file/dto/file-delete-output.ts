import { Field, Int, ObjectType } from "@nestjs/graphql"


@ObjectType()
export class FileDeleteOutput{

  @Field( type => Int, { nullable: true } )
  status: number
    
  @Field({ nullable: true })
  message: string
  
  
}
