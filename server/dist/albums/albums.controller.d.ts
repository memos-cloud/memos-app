/// <reference types="mongoose" />
import { Album } from 'src/models/Album.schema';
import { AlbumsService } from './albums.service';
import { CreateOrUpdateAlbumDto } from './dto/albums.dto';
export declare class AlbumsController {
    private readonly albumService;
    constructor(albumService: AlbumsService);
    myAlbums(): import("mongoose").Query<(Album & import("mongoose").Document<any, any, Album>)[], Album & import("mongoose").Document<any, any, Album>, {}, Album>;
    albumById(id: string): import("mongoose").Query<Album & import("mongoose").Document<any, any, Album>, Album & import("mongoose").Document<any, any, Album>, {}, Album>;
    createAlbum(data: CreateOrUpdateAlbumDto): Promise<Album>;
    updateAlbum(id: string, data: CreateOrUpdateAlbumDto): Promise<Album & import("mongoose").Document<any, any, Album>>;
    deleteAlbum(id: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
}
