import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const deleteAlbum = async (albumId: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.delete(
      `${serverURL}/albums/${albumId}`,
      config
    )
    return data
  } catch (error) {
    ToastAndroid.show(
      "Couldn't Delete This Album at the moment!",
      ToastAndroid.SHORT
    )
  }
}
