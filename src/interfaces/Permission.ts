import mongoose from "mongoose";

export interface IPermission {
    name: string;
    status: Boolean;
    modelName: String;
    permissionTxt: String; // this is for display clear msg while updating role and permission :)
    roles: Array<mongoose.Types.ObjectId>;//<IRole['_id']>;
    createdAt?: Date;
    updatedAt?: Date;
}
