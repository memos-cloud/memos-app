import { Model } from 'mongoose';
import { Album } from 'src/models/Album.schema';
import { CreateOrUpdateAlbumDto } from './dto/albums.dto';
export declare class AlbumsService {
    private albumModel;
    constructor(albumModel: Model<Album>);
    getMyAlbums(userId: string): import("mongoose").Query<(Album & import("mongoose").Document<any, any, Album>)[], Album & import("mongoose").Document<any, any, Album>, {}, Album>;
    getAlbumById(id: string, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    createNewAlbum(data: CreateOrUpdateAlbumDto, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    updateAlbum(id: string, data: CreateOrUpdateAlbumDto, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    deleteAlbum(id: string, userId: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
}
