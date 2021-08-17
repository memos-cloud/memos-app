import { S3 } from 'aws-sdk';
interface deleteFilesArgs {
    keys: string[];
}
export declare const deleteFiles: ({ keys }: deleteFilesArgs) => Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectsOutput, import("aws-sdk").AWSError>>;
export {};
