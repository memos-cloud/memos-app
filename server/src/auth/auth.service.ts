import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/models/User.schema'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req: any, res: Response) {
    if (!req.user) {
      return 'No user from google'
    }

    const userExists = await this.userModel.findOne({ email: req.user.email })

    let User: UserDocument

    if (!userExists) {
      const user = new this.userModel({
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        profilePic: req.user.picture,
      })
      User = user
      await user.save()
    } else {
      User = userExists
    }
    const url = `${
      process.env.NODE_ENV === 'production'
        ? `exp://192.168.1.5:19000/--/`
        : `exp://192.168.1.5:19000/--/`
    }SaveToken/${this.jwtService.sign({ id: User.id })}`

    res.redirect(url)
  }
}
