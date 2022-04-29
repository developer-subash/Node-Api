import mongoose = require("mongoose");
import { IUser } from "../../../models/user.model";
interface Write<T> {
    create: (item:IUser) => void;
    update:(_id: mongoose.Types.ObjectId, item:T) => void ;
    delete: (_id: string) => void;
    
}

export = Write;