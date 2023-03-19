import axios from 'axios'
import { showMessage } from 'react-native-flash-message'
import { serverURL } from '../constants/serverURL'
import { queryClient, store } from '../state-management'

export const getAlbumFiles = async (albumId: string, skip?: number) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const { data } = await axios.get(
      `${serverURL}/albums/${albumId}/files?take=30&skip=${skip}`,
      config,
    )

    queryClient.setQueryData(`albumFiles:${albumId}:hasMore`, data.hasMore)

    if (skip) {
      return data.files
    }
    return [{ placeholder: 'addFiles' }, ...data.files]
  } catch (error) {
    showMessage({
      message: "Couldn't Get Album Files!",
      type: 'danger',
    })
    return []
  }
}
