import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common'

@Injectable()
export class DeviceIdGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const params = (context.getArgs()[0] as any).query

    if (!params?.deviceId) {
      throw new HttpException('Device Id is required', 400)
    }

    // Set deviceId in the Context
    global.deviceId = params?.deviceId

    return true
  }
}
