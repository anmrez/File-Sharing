import { Field, ObjectType } from "@nestjs/graphql";




@ObjectType()
export class FileOutput{


  @Field({ nullable: false, description: 'name of file' })
  name: string

  @Field({ nullable: false, description: 'description of file' })
  description: string
  
  @Field({ nullable: true, description: 'number of downloads' })
  number_downloads: number
  
  @Field({ nullable: true, description: 'Date time' })
  storage_time: Date

}
