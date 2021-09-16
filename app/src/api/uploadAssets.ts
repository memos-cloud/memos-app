import * as FileSystem from 'expo-file-system'
import { FileSystemSessionType, FileSystemUploadType } from 'expo-file-system'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const uploadAssets = (albumId: string, filePath: string) => {
  const accessToken = store.getState().accessToken
  const uploadTo = `${serverURL}/albums/${albumId}/upload`

  return FileSystem.uploadAsync(uploadTo, filePath, {
    uploadType: FileSystemUploadType.MULTIPART,
    fieldName: 'Files',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      devicefileurl: filePath,
    },
    httpMethod: 'POST',
    sessionType: FileSystemSessionType.BACKGROUND,
  })
}
