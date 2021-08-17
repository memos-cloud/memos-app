import { S3 } from 'aws-sdk';
interface uploadFileArgs {
    fileName: string;
    buffer: any;
    mimetype: string;
    folder: string;
}
export declare const uploadFile: ({ fileName, buffer, mimetype, folder, }: uploadFileArgs) => Promise<S3.ManagedUpload.SendData>;
export {};
