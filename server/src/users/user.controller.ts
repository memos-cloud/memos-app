import { Controller, Get } from '@nestjs/common';
import { User } from 'src/models/User.schema';
import { UsersService } from './users.service';

@Controller('me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getProfile(): User {
    return this.usersService.getUserProfile();
  }
}
