import { IUser } from "../users/interface";


export interface CustomRequest {
    user: IUser;
    file: any;
}