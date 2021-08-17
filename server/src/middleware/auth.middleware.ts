import { HttpException, Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { NextFunction, Request, Response } from 'express'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/models/User.schema'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']

    if (!token) {
      throw new HttpException('Access Token is Required!', 400)
    }

    const parsedToken = token.split(' ')[1]

    try {
      const { id } = await this.jwtService.verify(parsedToken)
      const user = await this.userModel.findById(id)

      if (!user) {
        throw new HttpException('User Not Found!', 400)
      }

      ;(req as any).userId = user.id
      ;(req as any).user = user
    } catch (error) {
      throw new HttpException('Access Token is Inavlid!', 400)
    }

    next()
  }
}
