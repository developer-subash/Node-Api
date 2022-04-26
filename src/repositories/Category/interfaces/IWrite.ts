import mongoose = require("mongoose");
import { ICategory } from "../../../models/category.model";
interface Write<T> {
    create: (item:ICategory, callback: (error: any, result: any ) => void) => void;
    update:(_id: mongoose.Types.ObjectId, item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    
}

export = Write;