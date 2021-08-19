import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/models/User.schema'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { Request } from 'express'
import { AnyAaaaRecord } from 'dns'

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

    if (!userExists) {
      const user = new this.userModel({
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        profilePic: req.user.picture,
      })

      await user.save()
      res.redirect(
        `${
          process.env.NODE_ENV === 'production'
            ? `memosrn://`
            : `exp:${
                process.env.SERVER_URL!.replace('http:', '').split(':')[0]
              }/--/`
        }tokens2/${this.jwtService.sign({ id: user.id })}`,
      )
    } else {
      return {
        userExists,
        token: this.jwtService.sign({ id: userExists.id }),
      }
    }
  }
}
