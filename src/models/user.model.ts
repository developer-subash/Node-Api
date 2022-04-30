import mongoose, { Document, Schema } from 'mongoose';
import { IRole } from '../models/role.model';
import { UserSchema } from '../schemas/user.schema';

/**
 * Interface to model the Role Schema for TypeScript.
 * @param firstName:string
 * @param middleName:string
 * @param lastName:string
 * @param email:string
 * @param email:string
 * @param gender:string
 * @param Role: string
 */
 export interface IUser extends Document {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    gender: string;
    password: string
    // role: IRole["_id"];
  }

// const User: Model<IUser> = model("User", userSchema);
const User = mongoose.model('User', UserSchema);

export default User;