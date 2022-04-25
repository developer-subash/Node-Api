import mongoose = require("mongoose");
import { IBanner } from "../../../models/banner.model";
interface Write<T> {
    create: (item:IBanner, callback: (error: any, result: any ) => void) => void;
    update:(_id: mongoose.Types.ObjectId, item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    
}

export = Write;