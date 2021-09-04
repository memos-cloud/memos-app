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
import {
  CreateAlbumDto,
  DeleteAlbumFilesDto,
  UpdateAlbumDto,
} from './dto/albums.dto'

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
    @Body() data: CreateAlbumDto,
  ): Promise<Album> {
    return this.albumService.createNewAlbum(data, userId)
  }

  @Put(':id')
  updateAlbum(
    @Req() { userId }: any,
    @Param('id') id: string,
    @Body() data: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, data, userId)
  }

  @Delete(':id')
  async deleteAlbum(@Req() req: any, @Param('id') id: string) {
    await this.albumService.deleteAlbum(id, req.userId, req.user)
    return {
      deleted: true,
    }
  }

  @Post(':id/upload')
  @UseInterceptors(FilesInterceptor('Files'))
  uploadFiles(
    @Req() req: any,
    @Param('id') id: string,
    @UploadedFiles() files: Array<any>,
  ) {
    if (!files) {
      throw new HttpException('Please provide files to Upload', 400)
    }
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
