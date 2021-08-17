import { Model } from 'mongoose';
import { User } from 'src/models/User.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    getUserProfile(userId: string): import("mongoose").Query<User & import("mongoose").Document<any, any, User>, User & import("mongoose").Document<any, any, User>, {}, User>;
}
