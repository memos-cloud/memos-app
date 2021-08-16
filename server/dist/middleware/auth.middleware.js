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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../models/User.schema");
let AuthMiddleware = class AuthMiddleware {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            throw new common_1.HttpException('Access Token is Required!', 400);
        }
        const parsedToken = token.split(' ')[1];
        try {
            const { id } = await this.jwtService.verify(parsedToken);
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.HttpException('User Not Found!', 400);
            }
            ;
            req.userId = user.id;
        }
        catch (error) {
            throw new common_1.HttpException('Access Token is Inavlid!', 400);
        }
        next();
    }
};
AuthMiddleware = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map