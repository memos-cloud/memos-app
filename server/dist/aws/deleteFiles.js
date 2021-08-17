"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFiles = void 0;
const s3Bucket_1 = require("./config/s3Bucket");
const BucketName_1 = require("./constants/BucketName");
const deleteFiles = ({ keys }) => {
    const data = {
        Bucket: BucketName_1.bucketName,
        Delete: {
            Objects: keys.map((key) => {
                return {
                    Key: key,
                };
            }),
        },
    };
    return s3Bucket_1.s3Bucket.deleteObjects(data).promise();
};
exports.deleteFiles = deleteFiles;
//# sourceMappingURL=deleteFiles.js.map