import { IsArray, IsDefined, IsString } from 'class-validator'

export class CreateOrUpdateAlbumDto {
  @IsString()
  name: string

  @IsString()
  description: string
}

export class DeleteAlbumFilesDto {
  @IsArray()
  @IsString({ each: true })
  filesIds: string[]
}
