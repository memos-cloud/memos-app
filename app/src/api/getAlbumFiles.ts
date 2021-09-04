import axios from 'axios'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const getAlbumFiles = async (albumId: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { data } = await axios.get(
    `${serverURL}/albums/${albumId}/files?take=10`,
    config
  )

  return [{ placeholder: 'addFiles' }, ...data]
}
