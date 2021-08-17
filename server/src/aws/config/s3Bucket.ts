import * as dotenv from 'dotenv'
dotenv.config()
import * as AWS from 'aws-sdk'
import { bucketName } from '../constants/BucketName'

const setupBucket = ({ bucketName }: { bucketName: string }) => {
  const env = (envVar: string) => {
    return envVar.replace(/\n|\r/g, '')
  }

  AWS.config.update({
    accessKeyId: env(process.env.AWS_ACCESS_KEY_ID!),
    secretAccessKey: env(process.env.AWS_SECRET_ACCESS_KEY!),
    region: 'eu-west-2',
  })

  const s3Bucket = new AWS.S3({ params: { bucketName } })
  return s3Bucket
}

const s3Bucket = setupBucket({ bucketName })

export { s3Bucket }
