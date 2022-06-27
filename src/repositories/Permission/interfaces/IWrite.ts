import mongoose = require("mongoose");
import { IPermission } from "../../../interfaces/Permission";

interface Write<T> {
    create: (item: IPermission) => Promise<mongoose.Document<IPermission>>;
    update:(_id: string, item:IPermission) => Promise<mongoose.Model<mongoose.Document<IPermission>>> ;
    delete: (_id: string) => Promise<Boolean>;
    
}

export = Write;