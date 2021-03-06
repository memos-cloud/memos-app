import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Response } from 'express'
import * as fs from 'fs'
import { Model } from 'mongoose'
import * as path from 'path'
import { User, UserDocument } from 'src/models/User.schema'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req: any, res: Response, type: 'google' | 'facebook') {
    if (!req.user) {
      return res.send('<h1>No User from Google!</h1>')
    }

    if (!req.user.email && type === 'facebook') {
      return res.send(
        "<h1>It Seems that your Facebook Account doesn't contain email address, please update your Facebook account information with a valid email to continue using this option.</h1>",
      )
    }
    const userExists = await this.userModel.findOne({ email: req.user.email })

    let User: UserDocument

    const deviceId = global.deviceId

    const checkDeviceIfSignedUpBefore = async () => {
      const userExists = await this.userModel.findOne({
        deviceId,
      })

      if (userExists) {
        res.send(
          fs.readFileSync(
            path.join(__dirname, '../../registeredBefore.html'),
            'utf8',
          ),
        )
        return false
      }
      return true
    }

    if (!userExists) {
      const usersCount = await this.userModel.countDocuments({})
      if (usersCount >= parseInt(process.env.USERS_LIMIT!)) {
        return res.send(
          '<h1>Sorry users free trial usage is for a limited number of people.</h1>',
        )
      }
      const result = await checkDeviceIfSignedUpBefore()
      if (!result) {
        global.deviceId = undefined
        return
      }
      const user = new this.userModel({
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        profilePic: req.user.picture,
        deviceId,
      })

      global.deviceId = undefined
      User = user
      await user.save()
    } else {
      User = userExists
    }

    const token = this.jwtService.sign({ id: User.id })

    const url =
      process.env.NODE_ENV === 'production'
        ? `memos-rn://SaveToken/${token}`
        : `exp://192.168.1.3:19000/--/SaveToken/${token}`

    res.redirect(url)
  }
}
