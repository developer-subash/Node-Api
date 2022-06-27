import mongoose,{ Document } from 'mongoose';
import { PermissionSchema } from '../schemas/permission.schema';
/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface IPermission extends Document {
    name: String;
    status: Boolean;
    createdAt: Date;
    updatedAt: Date;
}


const Permission = mongoose.model('Permission', PermissionSchema);
// const Permission = mongoose.model('Permission', PermissionSchema);
export default Permission;