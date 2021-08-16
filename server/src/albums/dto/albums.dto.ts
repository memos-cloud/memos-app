import { IsString } from 'class-validator'

export class CreateOrUpdateAlbumDto {
  @IsString()
  name: string

  @IsString()
  description: string
}
