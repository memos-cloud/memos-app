import { Model } from 'mongoose';
import { UserDocument } from 'src/models/User.schema';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    googleLogin(req: any): Promise<"No user from google" | {
        user: UserDocument;
        token: string;
        userExists?: undefined;
    } | {
        userExists: UserDocument;
        token: string;
        user?: undefined;
    }>;
}
