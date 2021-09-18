import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { queryClient, store } from '../state-management/stores'

export const getAlbumFiles = async (albumId: string, skip?: number) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(
      `${serverURL}/albums/${albumId}/files?take=30&skip=${skip}`,
      config
    )

    queryClient.setQueryData(`albumFiles:${albumId}:hasMore`, data.hasMore)

    if (skip) {
      return data.files
    }
    return [{ placeholder: 'addFiles' }, ...data.files]
  } catch (error) {
    ToastAndroid.show("Couldn't Get Album Files!", ToastAndroid.SHORT)
  }
}
