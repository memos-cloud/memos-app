import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const getAlbumById = async (id: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(`${serverURL}/albums/${id}`, config)

    return data
  } catch (error) {
    showMessage({
      message: "Couldn't Get Album Data!",
      type: 'danger',
    })
  }
}
