import { Asset } from 'expo-media-library'
import * as ImageManipulator from 'expo-image-manipulator'

export const resizeImage = async (
  image: Asset,
  manipulate: { width: number }
) => {
  const { width } = manipulate

  const aspectRatio = image.width / image.height

  let sizeOptions: {
    width?: number
    height?: number
  } = {
    width: Math.round(width * 2.5),
    height: Math.round((width * 2.5) / aspectRatio),
  }

  // console.log(sizeOptions)

  const options = [{ resize: sizeOptions }]

  const manipResult = await ImageManipulator.manipulateAsync(
    image.uri,
    options,
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  )

  return { ...image, originalURI: image.uri, uri: manipResult.uri }
}
