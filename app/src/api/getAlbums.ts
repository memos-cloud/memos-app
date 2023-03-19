import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'
import { queryClient, store } from '../state-management'

export const getAlbums = async (skip?: number) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(
      `${serverURL}/albums?take=10&skip=${skip || 0}`,
      config,
    )

    queryClient.setQueryData('albums:hasMore', data.hasMore)

    return data.albums
  } catch (error) {
    showMessage({
      message: "Couldn't Get Albums!",
      type: 'danger',
    })
    return []
  }
}
