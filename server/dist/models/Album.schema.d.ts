import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './User.schema';
export declare type AlbumDocument = Album & Document;
export declare class Album {
    _id: string;
    name: string;
    description: string;
    owner: User | string;
}
export declare const AlbumSchema: mongoose.Schema<mongoose.Document<Album, any, any>, mongoose.Model<mongoose.Document<Album, any, any>, any, any>, undefined, {}>;
