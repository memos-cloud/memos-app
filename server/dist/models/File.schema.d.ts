import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Album } from './Album.schema';
import { User } from './User.schema';
export declare type FileDocument = File & Document;
export declare class File {
    _id: string;
    key: string;
    size: number;
    albumId: Album | string;
    owner: User | string;
}
export declare const FileSchema: mongoose.Schema<mongoose.Document<File, any, any>, mongoose.Model<mongoose.Document<File, any, any>, any, any>, undefined, {}>;
