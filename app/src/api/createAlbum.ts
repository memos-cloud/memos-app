import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management'

export const createAlbum = async (name: string) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.post(`${serverURL}/albums`, { name }, config)
    await AsyncStorage.setItem(`album:${data._id}:albumCover`, 'default')

    return data
  } catch (error) {
    showMessage({
      message: "Couldn't Create a new Album!",
      type: 'danger',
    })
  }
}
