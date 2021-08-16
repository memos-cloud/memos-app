import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbumsModule } from './albums/albums.module'
import { AuthModule } from './auth/auth.module'
import { MiddlewareModule } from './middleware/middleware.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    AuthModule,
    AlbumsModule,
    UsersModule,
    MiddlewareModule,
  ],
})
export class AppModule {}
