import Joi from 'joi';
import { IUser } from '../models/user.model';
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

export interface ILogin {
    email: string,
    password: string
}
export interface LoginResponse {
    user: IUser,
    accessToken: string,
    refreshToken: string,
}

export const LoginValidationSchema = Joi.object({
    email: Joi.string().email()
        .required().messages({
            "string.empty": `Email cannot be an empty field`,
            "any.required": `Email is a required.`,
            "string.email": "Email must be email type"
        }),
    password: Joi.string().required().messages({
        'string.empty': `Password Cannot Be Empty`,
        'string.required': `Password is Required`,
    }),
});

export interface IValidation {
    [index: string]: string
}

export interface IToken {
    [index: string]: IUser
}