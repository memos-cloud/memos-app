import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { DeviceIdGuard } from './deviceId.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Google
  @Get('/google')
  @UseGuards(DeviceIdGuard, AuthGuard('google'))
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.googleLogin(req, res, 'google')
  }

  // Facebook
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(): Promise<any> {}

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    return this.authService.googleLogin(req, res, 'facebook')
  }
}
