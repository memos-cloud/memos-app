/// <reference types="multer" />
import { Model } from 'mongoose';
import { Album } from 'src/models/Album.schema';
import { File } from 'src/models/File.schema';
import { User, UserDocument } from 'src/models/User.schema';
import { CreateOrUpdateAlbumDto, DeleteAlbumFilesDto } from './dto/albums.dto';
export declare class AlbumsService {
    private albumModel;
    private userModel;
    private fileModel;
    constructor(albumModel: Model<Album>, userModel: Model<User>, fileModel: Model<File>);
    getMyAlbums(userId: string, { take, skip }: {
        take: number;
        skip: number;
    }): import("mongoose").Query<(Album & import("mongoose").Document<any, any, Album>)[], Album & import("mongoose").Document<any, any, Album>, {}, Album>;
    getMyAlbumFiles(userId: string, albumId: string, { take, skip }: {
        take: number;
        skip: number;
    }): import("mongoose").Query<(File & import("mongoose").Document<any, any, File>)[], File & import("mongoose").Document<any, any, File>, {}, File>;
    getAlbumById(id: string, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    createNewAlbum(data: CreateOrUpdateAlbumDto, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    updateAlbum(id: string, data: CreateOrUpdateAlbumDto, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    deleteAlbum(id: string, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    uploadFiles(id: string, files: Array<Express.Multer.File>, userId: string, user: UserDocument): Promise<Album & import("mongoose").Document<any, any, Album>>;
    deleteAlbumFiles(user: UserDocument, userId: string, id: string, { filesIds }: DeleteAlbumFilesDto): Promise<{
        ok?: number;
        n?: number;
    } & {
        deletedCount?: number;
    }>;
}
