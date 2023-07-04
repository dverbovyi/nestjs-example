import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Cat } from "@prisma/client";

export class CatDTO implements Pick<Cat, 'name'> {
  @IsString()
  @IsNotEmpty()
  name

  @IsString()
  @IsOptional()
  owner
}
