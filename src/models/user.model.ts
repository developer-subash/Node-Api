import mongoose, { Document, Schema } from 'mongoose';
import { IRole } from '../models/role.model';

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
    role: IRole["_id"];
  }

const userSchema = new Schema({
    firstName: { 
        type: String, 
        required: true
     },
    middleName: { 
        type: String, 
        required: true
    },
    lastName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, unique: true 
    },
    gender: { 
        type: String, 
        enum: ['MALE', 'FEMALE', 'OTHERS'], 
        default: 'MALE' 
    },
    Role: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, ref: ''
    }
}, { timestamps: true }
);

// const User: Model<IUser> = model("User", userSchema);
const User = mongoose.model('User', userSchema);

export default User;