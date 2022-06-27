import mongoose,{ Document } from 'mongoose';
import { PermissionSchema } from '../schemas/permission.schema';
/**
 * Interface to model the Permission Schema for TypeScript.
 * @param name:string
 *  @param status: Boolean;
 *  @param modelName: String;
 *  @param  permissionTxt: String;
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface IPermission extends Document {
    name: String;
    status: Boolean;
    modelName: string;
    permissionTxt: String;
    createdAt: Date;
    updatedAt: Date;
}


const Permission = mongoose.model('Permission', PermissionSchema);
// const Permission = mongoose.model('Permission', PermissionSchema);
export default Permission;