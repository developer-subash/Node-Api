import { User } from './User';
export interface IRole {
    title: string;
    createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}