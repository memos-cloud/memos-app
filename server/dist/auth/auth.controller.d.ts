import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<"No user from google" | {
        user: import("../models/User.schema").UserDocument;
        token: string;
        userExists?: undefined;
    } | {
        userExists: import("../models/User.schema").UserDocument;
        token: string;
        user?: undefined;
    }>;
}
