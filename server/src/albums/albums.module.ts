import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Album, AlbumSchema } from 'src/models/Album.schema'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from './albums.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
