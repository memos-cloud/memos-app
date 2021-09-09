import axios from 'axios'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const updateAlbum = async (name: string, albumId: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { data } = await axios.put(
    `${serverURL}/albums/${albumId}`,
    { name },
    config
  )

  return data
}
