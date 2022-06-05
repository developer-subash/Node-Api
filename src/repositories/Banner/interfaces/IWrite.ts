import mongoose = require("mongoose");
import { IFoodItem } from "../../../models/foodItem.model";
interface Write<T> {
    create: (item:IFoodItem, callback: (error: any, result: any ) => void) => void;
    update:(_id: mongoose.Types.ObjectId, item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    
}

export = Write;