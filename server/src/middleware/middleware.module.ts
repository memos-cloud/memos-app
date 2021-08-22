import {
  Get,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbumsController } from 'src/albums/albums.controller'
import { User, UserSchema } from 'src/models/User.schema'
import { UsersController } from 'src/users/user.controller'
import { AuthMiddleware } from './auth.middleware'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '45d' },
    }),
  ],
  providers: [AuthMiddleware],
})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AlbumsController, UsersController)
  }
}
