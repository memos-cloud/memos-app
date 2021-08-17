"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Album_schema_1 = require("../models/Album.schema");
const File_schema_1 = require("../models/File.schema");
const User_schema_1 = require("../models/User.schema");
const albums_controller_1 = require("./albums.controller");
const albums_service_1 = require("./albums.service");
let AlbumsModule = class AlbumsModule {
};
AlbumsModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Album_schema_1.Album.name, schema: Album_schema_1.AlbumSchema },
                { name: User_schema_1.User.name, schema: User_schema_1.UserSchema },
                { name: File_schema_1.File.name, schema: File_schema_1.FileSchema },
            ]),
        ],
        controllers: [albums_controller_1.AlbumsController],
        providers: [albums_service_1.AlbumsService],
    })
], AlbumsModule);
exports.AlbumsModule = AlbumsModule;
//# sourceMappingURL=albums.module.js.map