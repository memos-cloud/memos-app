import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Album, AlbumSchema } from 'src/models/Album.schema'
import { File, FileSchema } from 'src/models/File.schema'
import { User, UserSchema } from 'src/models/User.schema'
import { AlbumsController } from './albums.controller'
import { AlbumsService } from './albums.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: User.name, schema: UserSchema },
      { name: File.name, schema: FileSchema },
    ]),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
