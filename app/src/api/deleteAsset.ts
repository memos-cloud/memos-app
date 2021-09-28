import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { showMessage } from 'react-native-flash-message'
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
      },
    )

    return data
  } catch (error) {
    showMessage({
      message: "Couldn't Delete This Asset at the moment!",
      type: 'danger',
    })
  }
}
