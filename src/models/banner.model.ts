import mongoose from "mongoose";
import { BannerSchema } from "../schemas/banner.schema";
import { ICategory } from "./category.model";
import { CategorySchema } from '../schemas/category.schema';

export interface IBanner extends Document {
    title: string;
    uri: string;
    imageUrl: string;
    price: number;
    tags: Array<string>;
    categories: Array<string>
  }

  const Banner = mongoose.model('Banner', BannerSchema);
export default Banner;