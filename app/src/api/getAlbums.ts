import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { queryClient, store } from '../state-management/stores'

export const getAlbums = async (skip?: number): Promise<any[]> => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(
      `${serverURL}/albums?take=10&skip=${skip || 0}`,
      config
    )

    queryClient.setQueryData('albums:hasMore', data.hasMore)

    return data.albums
  } catch (error) {
    ToastAndroid.show("Couldn't Get Albums!", ToastAndroid.SHORT)
  }
}
