import { Injectable } from '@nestjs/common'
import { User } from 'src/models/User.schema'

@Injectable()
export class UsersService {
  getUserProfile(): User {
    return {
      _id: '2',
      name: 'Yassin',
      email: 'yassin@gmail.com',
      profilePic: '/profilePic ',
    }
  }
}
