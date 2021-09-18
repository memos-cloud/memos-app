import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const updateAlbum = async (
  { name, AlbumFileId }: { name?: string; AlbumFileId?: string },
  albumId: string
) => {
  const accessToken = store.getState().accessToken

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  }

  try {
    const res = await axios.put(
      `${serverURL}/albums/${albumId}`,
      { name, AlbumFileId },
      config
    )

    return res.data
  } catch (error) {
    ToastAndroid.show("Couldn't Update Album!", ToastAndroid.SHORT)
  }
}
