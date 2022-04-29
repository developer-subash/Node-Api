import { IRole } from './Role';

export interface User {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    gender: string;
    dateOfBirth: Date;
    role: IRole;
}

export interface IValidation {
    [index: string]: string
}