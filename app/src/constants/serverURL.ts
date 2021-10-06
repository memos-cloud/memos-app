import { v4 } from 'uuid'

export const serverURL =
  process.env.NODE_ENV === 'development'
    ? 'https://memos-rn.herokuapp.com'
    : 'https://memos-rn.herokuapp.com'

export const AllPhotosId = v4()

export const DOWNLOADS_ALBUM_NAME = 'Memos'
