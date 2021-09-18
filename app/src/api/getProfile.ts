import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'

export const getProfile = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(`${serverURL}/me`, config)
    return data
  } catch (error) {
    ToastAndroid.show("Couldn't Get Profile!", ToastAndroid.SHORT)
  }
}
