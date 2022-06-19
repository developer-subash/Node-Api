import mongoose = require("mongoose");
import { IUser } from "../../../models/user.model";
interface Write<T> {
    create: (item:IUser) => void;
    update:<T, K extends keyof T>(_id: K, item:T) => void ;
    delete: (_id: mongoose.Types.ObjectId) => void;
    
}

export = Write;