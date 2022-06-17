import mongoose, { Document } from 'mongoose';
import { ForgetPasswordSchema } from '../schemas/forgetpassword.schema';

/**
 * Interface to model the ForgetPassword Schema for TypeScript.
 * @param lastrequestdate:date
 * @param token:number
 * @param valid:boolean
 * @param user:string
 */
export interface IForgetPassword extends Document {
  token: number;
  valid: boolean;
  user: string;
  lastlogindate: Date;
}

const UserForgetPasswordModel: mongoose.Model<mongoose.Document<IForgetPassword>>  = mongoose.model('UserForgetPassword', ForgetPasswordSchema);

export default UserForgetPasswordModel;