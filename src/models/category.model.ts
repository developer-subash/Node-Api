import mongoose,{ Document, Schema } from 'mongoose';
import { CategorySchema } from '../schemas/category.schema';
/**
 * Interface to model the Category Schema
 * @param title:string
 * @param createdAt:Date
 * @param updatedAt:Date
 */
export interface ICategory extends Document {
    // _id: mongoose.Types.ObjectId;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

const Category = mongoose.model('Category', CategorySchema);
export default Category;