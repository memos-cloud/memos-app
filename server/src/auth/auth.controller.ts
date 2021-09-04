import { Body, Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'

@Controller('google')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return this.authService.googleLogin(req, res)
  }
}
