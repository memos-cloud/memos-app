"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Bucket = void 0;
const dotenv = require("dotenv");
dotenv.config();
const AWS = require("aws-sdk");
const BucketName_1 = require("../constants/BucketName");
const setupBucket = ({ bucketName }) => {
    const env = (envVar) => {
        return envVar.replace(/\n|\r/g, '');
    };
    AWS.config.update({
        accessKeyId: env(process.env.AWS_ACCESS_KEY_ID),
        secretAccessKey: env(process.env.AWS_SECRET_ACCESS_KEY),
        region: 'eu-west-2',
    });
    const s3Bucket = new AWS.S3({ params: { bucketName } });
    return s3Bucket;
};
const s3Bucket = setupBucket({ bucketName: BucketName_1.bucketName });
exports.s3Bucket = s3Bucket;
//# sourceMappingURL=s3Bucket.js.map