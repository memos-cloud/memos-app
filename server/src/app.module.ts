import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { GoogleStrategy } from './auth/google.strategy'
import { UsersController } from './users/user.controller'
import { AlbumsController } from './albums/albums.controller'
import { UsersService } from './users/users.service'
import { AlbumsService } from './albums/albums.service'
import { User, UserSchema } from './models/User.schema'
import { Album, AlbumSchema } from './models/Album.schema'
import { AlbumsModule } from './albums/albums.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    AlbumsModule,
    UsersModule,
  ],
})
export class AppModule {}
