/// <reference types="mongoose" />
import { Album } from 'src/models/Album.schema';
import { AlbumsService } from './albums.service';
import { CreateOrUpdateAlbumDto } from './dto/albums.dto';
export declare class AlbumsController {
    private readonly albumService;
    constructor(albumService: AlbumsService);
    myAlbums({ userId }: any): import("mongoose").Query<(Album & import("mongoose").Document<any, any, Album>)[], Album & import("mongoose").Document<any, any, Album>, {}, Album>;
    albumById({ userId }: any, id: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    createAlbum({ userId }: any, data: CreateOrUpdateAlbumDto): Promise<Album>;
    updateAlbum({ userId }: any, id: string, data: CreateOrUpdateAlbumDto): Promise<Album & import("mongoose").Document<any, any, Album>>;
    deleteAlbum({ userId }: any, id: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
}
