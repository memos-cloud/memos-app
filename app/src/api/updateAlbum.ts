import axios from 'axios'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const updateAlbum = async (
  { name, AlbumFileId }: { name?: string; AlbumFileId?: string },
  albumId: string
) => {
  try {
    const accessToken = store.getState().accessToken

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    }

    console.log(`${serverURL}/albums/${albumId}`, { name, AlbumFileId })

    const res = await axios.put(
      `${serverURL}/albums/${albumId}`,
      { name, AlbumFileId },
      config
    )
    console.log(res)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
