import { User } from './User';
export interface IRole {
    title: String;
    createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}