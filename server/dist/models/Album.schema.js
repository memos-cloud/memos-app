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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumSchema = exports.Album = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const User_schema_1 = require("./User.schema");
let Album = class Album {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Album.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Album.prototype, "description", void 0);
__decorate([
    mongoose_1.Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", User_schema_1.User)
], Album.prototype, "owner", void 0);
Album = __decorate([
    mongoose_1.Schema({ timestamps: true })
], Album);
exports.Album = Album;
exports.AlbumSchema = mongoose_1.SchemaFactory.createForClass(Album);
//# sourceMappingURL=Album.schema.js.map