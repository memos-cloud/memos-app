import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import * as fs from 'fs'
import * as path from 'path'

@Controller('policies')
export class PoliciesController {
  @Get()
  policies(@Res() res: Response) {
    const file = fs.readFileSync(
      path.join(__dirname, '../../policies.html'),
      'utf8',
    )
    return res.send(file)
  }
}
