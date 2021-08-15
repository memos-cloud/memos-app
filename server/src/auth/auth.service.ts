import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/models/User.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const userExists = await this.userModel.findOne({ email: req.user.email });

    if (!userExists) {
      const user = new this.userModel({
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        profilePic: req.user.picture,
      });

      await user.save();

      return {
        user,
        token: this.jwtService.sign({ id: user.id }),
      };
    } else {
      return {
        userExists,
        token: this.jwtService.sign({ id: userExists.id }),
      };
    }
  }
}
