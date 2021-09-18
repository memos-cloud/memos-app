import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const deleteAssets = async (albumId: string, assetIds: string[]) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.delete(
      `${serverURL}/albums/${albumId}/files`,
      {
        data: { filesIds: assetIds },
        ...config,
      }
    )

    return data
  } catch (error) {
    ToastAndroid.show(
      "Couldn't Delete This Asset at the moment!",
      ToastAndroid.SHORT
    )
  }
}
