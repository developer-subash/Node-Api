import mongoose,{ Document, Schema } from 'mongoose';
import { RoleSchema } from '../schemas/role.schema';

/**
 * Interface to model the Role Schema for TypeScript.
 * @param name:string
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface IRole extends Document {
    name: String;
    createdAt: Date;
    updatedAt: Date;
}

// const Role: Model<IRole> = model("Role", RoleSchema);
const Role = mongoose.model('Role', RoleSchema);
export default Role;