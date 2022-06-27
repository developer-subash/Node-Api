export interface IPermission {
    name: string;
    status: Boolean;
    modelName: String;
    permissionTxt: String; // this is for display clear msg while updating role and permission :)
    createdAt?: Date;
    updatedAt?: Date;
}
