"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const albums_controller_1 = require("../albums/albums.controller");
const User_schema_1 = require("../models/User.schema");
const auth_middleware_1 = require("./auth.middleware");
let MiddlewareModule = class MiddlewareModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(albums_controller_1.AlbumsController);
    }
};
MiddlewareModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: User_schema_1.User.name, schema: User_schema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '45d' },
            }),
        ],
        providers: [auth_middleware_1.AuthMiddleware],
    })
], MiddlewareModule);
exports.MiddlewareModule = MiddlewareModule;
//# sourceMappingURL=middleware.module.js.map