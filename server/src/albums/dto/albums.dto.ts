import { IsArray, IsOptional, IsString } from 'class-validator'

export class CreateAlbumDto {
  @IsString()
  name: string

  @IsString()
  description: string
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  AlbumFileId?: string
}

export class DeleteAlbumFilesDto {
  @IsArray()
  @IsString({ each: true })
  filesIds: string[]
}
