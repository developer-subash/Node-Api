import mongoose = require("mongoose");
import { IRole } from "../../../interfaces/Role";
interface Write<T> {
    create: (item: IRole) => Promise<mongoose.Document<IRole>>;
    update:(_id: string, item:IRole) => Promise<mongoose.Model<mongoose.Document<IRole>>> ;
    delete: (_id: string) => Promise<Boolean>;
    
}

export = Write;