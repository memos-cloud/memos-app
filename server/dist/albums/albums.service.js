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
const deleteFiles_1 = require("../aws/deleteFiles");
const uploadFile_1 = require("../aws/uploadFile");
const Album_schema_1 = require("../models/Album.schema");
const File_schema_1 = require("../models/File.schema");
const User_schema_1 = require("../models/User.schema");
let AlbumsService = class AlbumsService {
    constructor(albumModel, userModel, fileModel) {
        this.albumModel = albumModel;
        this.userModel = userModel;
        this.fileModel = fileModel;
    }
    getMyAlbums(userId, { take, skip }) {
        return this.albumModel.find({ owner: userId }).limit(take).skip(skip);
    }
    getMyAlbumFiles(userId, albumId, { take, skip }) {
        return this.fileModel
            .find({ owner: userId, albumId })
            .limit(take)
            .skip(skip);
    }
    async getAlbumById(id, userId) {
        const album = await this.albumModel.findOne({ _id: id, owner: userId });
        if (!album) {
            throw new common_1.HttpException('Album Not Found!', 404);
        }
        return album;
    }
    async createNewAlbum(data, userId) {
        const album = new this.albumModel(Object.assign(Object.assign({}, data), { owner: userId }));
        await album.save();
        return album;
    }
    async updateAlbum(id, data, userId) {
        const album = await this.albumModel.findOne({ _id: id, owner: userId });
        if (!album) {
            throw new common_1.HttpException('Album Not Found!', 404);
        }
        Object.keys(data).forEach((e) => {
            album[e] = data[e];
        });
        await album.save();
        return album;
    }
    async deleteAlbum(id, userId) {
        const album = await this.albumModel.findOne({ _id: id, owner: userId });
        if (!album) {
            throw new common_1.HttpException('Album Not Found!', 404);
        }
        await album.delete();
        return album;
    }
    async uploadFiles(id, files, userId, user) {
        const album = await this.albumModel.findOne({ _id: id, owner: userId });
        if (!album) {
            throw new common_1.HttpException('Album Not Found!', 404);
        }
        const fileSizesArr = files.map((file) => file.size / 1048576);
        const filesSize = fileSizesArr.reduce((value, currentValue) => {
            return value + currentValue;
        }, 0);
        if (user.usage + filesSize > parseInt(process.env.QUOTA_LIMIT)) {
            throw new common_1.HttpException("You've Reached Your Quota Limit!", 404);
        }
        const uploadAlbumFiles = async () => {
            const albumFiles = [];
            const promises = files.map(async (file) => {
                const fileName = Date.now() + '.' + file.mimetype.split('/')[1];
                const folderName = album.name + '-' + album.id + '/';
                const key = folderName + fileName;
                albumFiles.push({
                    key,
                    albumId: album.id,
                    owner: userId,
                    size: file.size / 1048576,
                });
                return uploadFile_1.uploadFile({
                    buffer: file.buffer,
                    fileName,
                    folder: folderName,
                    mimetype: file.mimetype,
                });
            });
            await Promise.all(promises);
            return albumFiles;
        };
        const albumFiles = await uploadAlbumFiles();
        await this.fileModel.insertMany(albumFiles);
        user.usage = parseFloat((user.usage + filesSize).toFixed(1));
        await user.save();
        return album.save();
    }
    async deleteAlbumFiles(user, userId, id, { filesIds }) {
        const findObject = {
            _id: { $in: filesIds },
            albumId: id,
            owner: userId,
        };
        const files = await this.fileModel.find(findObject);
        const fileSizesArr = files.map((file) => file.size);
        const filesSize = fileSizesArr.reduce((value, currentValue) => {
            return value + currentValue;
        }, 0);
        user.usage = parseFloat((user.usage - filesSize).toFixed(1));
        await user.save();
        await deleteFiles_1.deleteFiles({ keys: files.map((file) => file.key) });
        return this.fileModel.deleteMany(findObject);
    }
};
AlbumsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(Album_schema_1.Album.name)),
    __param(1, mongoose_1.InjectModel(User_schema_1.User.name)),
    __param(2, mongoose_1.InjectModel(File_schema_1.File.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AlbumsService);
exports.AlbumsService = AlbumsService;
//# sourceMappingURL=albums.service.js.map