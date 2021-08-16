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
exports.AlbumsController = void 0;
const common_1 = require("@nestjs/common");
const Album_schema_1 = require("../models/Album.schema");
const albums_service_1 = require("./albums.service");
const albums_dto_1 = require("./dto/albums.dto");
let AlbumsController = class AlbumsController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    myAlbums({ userId }) {
        return this.albumService.getMyAlbums(userId);
    }
    albumById({ userId }, id) {
        return this.albumService.getAlbumById(id, userId);
    }
    async createAlbum({ userId }, data) {
        return this.albumService.createNewAlbum(data, userId);
    }
    updateAlbum({ userId }, id, data) {
        return this.albumService.updateAlbum(id, data, userId);
    }
    deleteAlbum({ userId }, id) {
        return this.albumService.deleteAlbum(id, userId);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "myAlbums", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "albumById", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Req()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, albums_dto_1.CreateOrUpdateAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "createAlbum", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, albums_dto_1.CreateOrUpdateAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "updateAlbum", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Req()),
    __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AlbumsController.prototype, "deleteAlbum", null);
AlbumsController = __decorate([
    common_1.Controller('albums'),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService])
], AlbumsController);
exports.AlbumsController = AlbumsController;
//# sourceMappingURL=albums.controller.js.map