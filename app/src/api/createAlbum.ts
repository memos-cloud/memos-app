import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

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
    ToastAndroid.show("Couldn't Create a new Album!", ToastAndroid.SHORT)
  }
}
