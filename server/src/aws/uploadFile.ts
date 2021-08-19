import { S3 } from 'aws-sdk'
import { s3Bucket } from './config/s3Bucket'
import bucketName from './constants/bucketName'

interface uploadFileArgs {
  fileName: string
  buffer: any
  mimetype: string
  folder: string
}

export const uploadFile = ({
  fileName,
  buffer,
  mimetype,
  folder,
}: uploadFileArgs) => {
  const data: S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: folder + fileName,
    Body: buffer,
    ContentType: mimetype,
  }

  return s3Bucket.upload(data).promise()
}
