import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/User.schema';
export declare class AuthMiddleware implements NestMiddleware {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
