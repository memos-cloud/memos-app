import { Controller, Get, Req } from '@nestjs/common'

@Controller('me')
export class UsersController {
  @Get()
  getProfile(@Req() { user }: any) {
    return user
  }
}
