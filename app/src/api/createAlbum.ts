import axios from 'axios'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const createAlbum = async (name: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { data } = await axios.post(`${serverURL}/albums`, { name }, config)

  return data
}
