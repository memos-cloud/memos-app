import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Response } from 'express'
import * as fs from 'fs'
import { Model } from 'mongoose'
import * as path from 'path'
import { User, UserDocument } from 'src/models/User.schema'

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
        : `exp://192.168.1.5:19000/--/SaveToken/${token}`

    res.redirect(url)
  }
}
