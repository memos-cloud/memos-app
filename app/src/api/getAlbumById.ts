import axios from 'axios'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const getAlbumById = async (id: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { data } = await axios.get(`${serverURL}/albums/${id}`, config)

  return data
}
