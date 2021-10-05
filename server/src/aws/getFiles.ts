import { S3 } from 'aws-sdk'
import { FileDocument } from 'src/models/File.schema'
import { s3Bucket } from './config/s3Bucket'
import bucketName from './constants/bucketName'

interface uploadFileArgs {
  key: string
  file: FileDocument
}

export const getFile = async ({ key, file }: uploadFileArgs) => {
  return {
    id: file.id,
    key: file.key,
    mimetype: file.mimetype,
    createdAt: (file as any).createdAt,
    fileURL: s3Bucket.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: key,
      Expires: 60 * 10,
    }),
    deviceFileUrl: file.deviceFileUrl,
    duration: file.duration,
  }
}
