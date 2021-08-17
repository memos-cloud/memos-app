"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const s3Bucket_1 = require("./config/s3Bucket");
const BucketName_1 = require("./constants/BucketName");
const uploadFile = ({ fileName, buffer, mimetype, folder, }) => {
    const data = {
        Bucket: BucketName_1.bucketName,
        Key: folder + fileName,
        Body: buffer,
        ContentType: mimetype,
    };
    return s3Bucket_1.s3Bucket.upload(data).promise();
};
exports.uploadFile = uploadFile;
//# sourceMappingURL=uploadFile.js.map