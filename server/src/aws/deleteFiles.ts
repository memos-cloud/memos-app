import { S3 } from 'aws-sdk'
import { s3Bucket } from './config/s3Bucket'
import { bucketName } from './constants/BucketName'

interface deleteFilesArgs {
  keys: string[]
}

export const deleteFiles = ({ keys }: deleteFilesArgs) => {
  const data: S3.DeleteObjectsRequest = {
    Bucket: bucketName,
    Delete: {
      Objects: keys.map((key) => {
        return {
          Key: key,
        }
      }),
    },
  }

  return s3Bucket.deleteObjects(data).promise()
}
