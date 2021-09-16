import axios from 'axios'
import { serverURL } from '../constants/serverURL'

export const getProfile = async (accessToken: string) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  const { data } = await axios.get(`${serverURL}/me`, config)

  return data
}
