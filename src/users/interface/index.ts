import { UserRole } from "../enum";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    followers?: string[]; 
    following?: string[]; 
}
