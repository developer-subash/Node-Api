import Joi, { number, string } from "joi";
import { join } from "path";
import { ICategory } from "../models/category.model";
import { Schema } from 'mongoose';
import { CategorySchema } from "./category.schema";
import mongoose from "mongoose";

 const BannerSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   uri: {
       type: String,
       required: true
   },
   imageUrl: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   tags: [{
      type: String,
      required: true
   }],
   categories: [
      {
         type: mongoose.Types.ObjectId,
         required: true,
         ref: 'Category',
       }
   ]

}, { timestamps: true }
);

const BannerValidationSchema = Joi.object({

   title: Joi.string().min(3).required().messages({
      "string.empty": `Title cannot be an empty field`,
      "any.required": `Title is a required.`,
      "string.base": `Title should be a type of text`,
      "string.min": `Title should be a not less than 3 string`,
   }),

   uri: Joi.string().required().messages({
      "any.required": `Uri is a required.`,
      "string.empty": `Uri cannot be an empty field`,
      "string.base": `Uri should be a type of text`
   }),

   imageUrl: Joi.string().required().messages({
      "any.required": `ImageUrl is a required.`,
      "string.empty": `ImageUrl cannot be an empty field`,
      "string.base": `ImageUrl should be a type of text`
   }),
   price: Joi.number().required().messages({
      "any.required": `Price is a required.`,
      "number.base": `Price should be a type of number`,
      "number.empty": `Price cannot be an empty field`,
   }),

   tags: Joi.array().items(
      Joi.string().required().messages({
         "any.required": `Tags is required.`,
         "string.empty": `Tags cannot be an empty field`,
         "string.base": `Tags should be a type of text`,
      })
   ),

   categories: Joi.array().items(
      Joi.required().messages({
         "any.required": `Categories is required.`,
         "string.empty": `Categories cann't be an empty field`
      })
   )
});

export {
   BannerValidationSchema,
   BannerSchema
};