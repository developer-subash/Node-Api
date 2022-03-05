import { User } from './User';
export interface Role {
    title: string;
    createdBy?: User;
    createdAt?: Date;
    updatedAt?: Date;
}