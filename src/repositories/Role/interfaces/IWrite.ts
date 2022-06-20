import mongoose = require("mongoose");
import { IRole } from "../../../interfaces/Role";
interface Write<T> {
    create: (item: IRole) => void;
    update:(_id: mongoose.Types.ObjectId, item:T) => void ;
    delete: (_id: mongoose.Types.ObjectId) => void;
    
}

export = Write;