import mongoose,{ Document, Schema } from 'mongoose';

/**
 * Interface to model the Role Schema for TypeScript.
 * @param title:string
 * @param createdBy:string
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface IRole extends Document {
    title: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: String
    },
}, { timestamps: true }
);

// const Role: Model<IRole> = model("Role", RoleSchema);
const Role = mongoose.model('Role', RoleSchema);
export default Role;