import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'

export const getProfile = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(`${serverURL}/me`, config)
    return data
  } catch (error) {
    showMessage({
      message: "Couldn't Get Profile!",
      type: 'danger',
    })
  }
}
