import { User } from './User';
export interface IRole {
    name: String;
    createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}