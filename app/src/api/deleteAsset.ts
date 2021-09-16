import axios from 'axios'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const deleteAssets = async (albumId: string, assetIds: string[]) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { data } = await axios.delete(`${serverURL}/albums/${albumId}/files`, {
    data: { filesIds: assetIds },
    ...config,
  })

  return data
}
