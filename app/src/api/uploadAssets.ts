import Upload, {
  MultipartUploadOptions,
  UploadOptions,
} from 'react-native-background-upload'
import { serverURL } from '../constants/serverURL'
import { store } from '../state-management/stores'

export const uploadAssets = (albumId: string, filePath: string) => {
  const accessToken = store.getState().accessToken

  const uploadOptions: UploadOptions | MultipartUploadOptions = {
    url:
      process.env.NODE_ENV === 'production'
        ? `${serverURL}/albums/${albumId}/upload`
        : `${serverURL}/albums/${albumId}/upload`,
    path: filePath.replace('file://', ''),
    method: 'POST',
    type: 'multipart',
    field: 'Files',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      devicefileurl: filePath,
    },
    // Below are options only supported on Android
    notification: {
      enabled: true,
      onProgressTitle: 'Syncing',
      onProgressMessage: 'Syncing Files With The Cloud...',
      onCompleteTitle: 'Files Are Synced With The Cloud',
      onErrorTitle: "Couldn't Sync your files with the Cloud.",
      onCompleteMessage: 'Files uploaded Successfuly',
      enableRingTone: true,
    },
  }
  return Upload.startUpload(uploadOptions)
    .then((uploadId) => {
      console.log('Upload started')
      Upload.addListener('progress', uploadId, (data) => {
        console.log(`Progress: ${data.progress}%`)
      })
      Upload.addListener('error', uploadId, (data) => {
        console.log(`Error: ${data.error}%`)
      })
      Upload.addListener('cancelled', uploadId, (data) => {
        console.log(`Cancelled!`)
      })
      Upload.addListener('completed', uploadId, (data) => {
        // data includes responseCode: number and responseBody: Object
        console.log('Completed!')
      })
    })
    .catch((err) => {
      console.log('Upload error!', err)
    })
}
