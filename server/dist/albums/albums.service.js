"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Album_schema_1 = require("../models/Album.schema");
let AlbumsService = class AlbumsService {
    constructor(albumModel) {
        this.albumModel = albumModel;
    }
    getMyAlbums() {
        return this.albumModel.find({});
    }
    getAlbumById(id) {
        return this.albumModel.findById(id);
    }
    async createNewAlbum(data, owner) {
        const album = new this.albumModel(Object.assign(Object.assign({}, data), { owner }));
        await album.save();
        return album;
    }
    async updateAlbum(id, data) {
        const album = await this.albumModel.findById(id);
        Object.keys(data).forEach((e) => {
            album[e] = data[e];
        });
        await album.save();
        return album;
    }
    async deleteAlbum(id) {
        const album = await this.albumModel.findById(id);
        await album.delete();
        return album;
    }
};
AlbumsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(Album_schema_1.Album.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AlbumsService);
exports.AlbumsService = AlbumsService;
//# sourceMappingURL=albums.service.js.map