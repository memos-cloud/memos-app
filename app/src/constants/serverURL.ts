import { v4 } from 'uuid'

export const serverURL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.1.4.sslip.io:3000'
    : 'https://memos-rn.herokuapp.com'

export const AllPhotosId = v4()
