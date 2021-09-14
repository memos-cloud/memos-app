import * as VideoThumbnails from 'expo-video-thumbnails'
import { Asset } from 'expo-media-library'
import { resizeImage } from './resizeImage'

export const getVideoThumbnail = async (
  video: Asset,
  { width }: { width: number }
) => {
  try {
    const manipResult = await VideoThumbnails.getThumbnailAsync(video.uri, {
      time: 0,
    })

    const resizedThumbnail = await resizeImage(
      { id: video.id, ...manipResult } as any,
      { width }
    )

    return {
      ...video,
      uri: resizedThumbnail.uri,
      originalURI: video.uri,
    }
  } catch (e) {
    console.warn(e)
  }
}
