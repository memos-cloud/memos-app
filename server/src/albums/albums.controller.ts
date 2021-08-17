import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Album } from 'src/models/Album.schema'
import { pagination } from 'src/shared/pagination'
import { AlbumsService } from './albums.service'
import { CreateOrUpdateAlbumDto, DeleteAlbumFilesDto } from './dto/albums.dto'

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @Get()
  myAlbums(@Req() req: any) {
    const { take, skip } = pagination(req)
    return this.albumService.getMyAlbums(req.userId, { take, skip })
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

  @Post(':id/upload')
  @UseInterceptors(FilesInterceptor('Files'))
  uploadFiles(
    @Req() req: any,
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    files.map((file) => {
      const type = file.mimetype.split('/')[0]

      if (type !== 'image' && type !== 'video') {
        throw new HttpException('Images and Videos Are Only Supported!', 400)
      }
    })

    return this.albumService.uploadFiles(id, files, req.userId, req.user)
  }

  @Get(':id/files')
  myAlbumFiles(@Req() req: any, @Param('id') id: string) {
    const { take, skip } = pagination(req)
    return this.albumService.getMyAlbumFiles(req.userId, id, { take, skip })
  }

  @Delete(':id/files')
  async deleteAlbumFiles(
    @Req() req: any,
    @Param('id') id: string,
    @Body() data: DeleteAlbumFilesDto,
  ) {
    return {
      ok: true,
      deleted: (
        await this.albumService.deleteAlbumFiles(req.user, req.userId, id, data)
      ).deletedCount,
    }
  }
}
