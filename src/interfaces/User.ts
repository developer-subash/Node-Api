import { Role } from './Role';

export interface User {
    firstName: string;
    middleName?: string;
    lastName: string;
    email?: string;
    gender: string;
    dateOfBirth: Date;
    role: Role;
}