import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'
import { config } from 'dotenv'
config()

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.SERVER_URL}/auth/facebook/redirect`,
      profileFields: ['emails', 'name', 'picture.type(large)'],
      scope: 'email',
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, photos, id } = profile

    const user = {
      email: emails ? emails[0].value : undefined,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      facebookId: id,
      accessToken,
    }

    done(null, user)
  }
}
