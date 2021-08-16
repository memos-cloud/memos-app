import { Controller, Delete, Get, Param, Post, Put, Body } from '@nestjs/common'
import { Album } from 'src/models/Album.schema'
import { AlbumsService } from './albums.service'
import { CreateOrUpdateAlbumDto } from './dto/albums.dto'

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  myAlbums() {
    return this.albumService.getMyAlbums()
  }

  @Get(':id')
  albumById(@Param('id') id: string) {
    return this.albumService.getAlbumById(id)
  }

  @Post()
  async createAlbum(@Body() data: CreateOrUpdateAlbumDto): Promise<Album> {
    return this.albumService.createNewAlbum(data, '611979de2473c640e0b1ea3c')
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() data: CreateOrUpdateAlbumDto) {
    return this.albumService.updateAlbum(id, data)
  }

  @Delete(':id')
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id)
  }
}
