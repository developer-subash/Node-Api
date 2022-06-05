import mongoose from "mongoose";
import { FoodItemSchema } from "../schemas/foodItem.schema";

export interface IFoodItem extends Document {
    title: string;
    imageUrl: string;
    price: number;
    tags: Array<string>;
    categories: Array<string>
  }
  

  const FoodItem: mongoose.Model<mongoose.Document<IFoodItem>>  = mongoose.model('food_item', FoodItemSchema);
export default FoodItem;