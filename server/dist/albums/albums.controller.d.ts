/// <reference types="multer" />
/// <reference types="mongoose" />
import { Album } from 'src/models/Album.schema';
import { AlbumsService } from './albums.service';
import { CreateOrUpdateAlbumDto, DeleteAlbumFilesDto } from './dto/albums.dto';
export declare class AlbumsController {
    private readonly albumService;
    constructor(albumService: AlbumsService);
    myAlbums(req: any): import("mongoose").Query<(Album & import("mongoose").Document<any, any, Album>)[], Album & import("mongoose").Document<any, any, Album>, {}, Album>;
    albumById({ userId }: any, id: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    createAlbum({ userId }: any, data: CreateOrUpdateAlbumDto): Promise<Album>;
    updateAlbum({ userId }: any, id: string, data: CreateOrUpdateAlbumDto): Promise<Album & import("mongoose").Document<any, any, Album>>;
    deleteAlbum({ userId }: any, id: string): Promise<Album & import("mongoose").Document<any, any, Album>>;
    uploadFiles(req: any, id: string, files: Array<Express.Multer.File>): Promise<Album & import("mongoose").Document<any, any, Album>>;
    myAlbumFiles(req: any, id: string): import("mongoose").Query<(import("../models/File.schema").File & import("mongoose").Document<any, any, import("../models/File.schema").File>)[], import("../models/File.schema").File & import("mongoose").Document<any, any, import("../models/File.schema").File>, {}, import("../models/File.schema").File>;
    deleteAlbumFiles(req: any, id: string, data: DeleteAlbumFilesDto): Promise<{
        ok: boolean;
        deleted: number;
    }>;
}
