import * as MediaLibrary from 'expo-media-library'

export const getFilesAccessPermission = async () => {
  const permision = await MediaLibrary.getPermissionsAsync()

  if (!permision.granted) {
    const { granted } = await MediaLibrary.requestPermissionsAsync()
    if (granted) {
      return true
    } else {
      return false
    }
  }

  return true
}

export const askingForFilesPermission = () => {
  return getFilesAccessPermission()
}
