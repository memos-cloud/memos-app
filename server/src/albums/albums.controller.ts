import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Req,
} from '@nestjs/common'
import { Album } from 'src/models/Album.schema'
import { Request } from 'supertest'
import { AlbumsService } from './albums.service'
import { CreateOrUpdateAlbumDto } from './dto/albums.dto'

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  myAlbums(@Req() { userId }: any) {
    return this.albumService.getMyAlbums(userId)
  }

  @Get(':id')
  albumById(@Req() { userId }: any, @Param('id') id: string) {
    return this.albumService.getAlbumById(id, userId)
  }

  @Post()
  async createAlbum(
    @Req() { userId }: any,
    @Body() data: CreateOrUpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.createNewAlbum(data, userId)
  }

  @Put(':id')
  updateAlbum(
    @Req() { userId }: any,
    @Param('id') id: string,
    @Body() data: CreateOrUpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, data, userId)
  }

  @Delete(':id')
  deleteAlbum(@Req() { userId }: any, @Param('id') id: string) {
    return this.albumService.deleteAlbum(id, userId)
  }
}
