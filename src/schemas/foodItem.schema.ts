import Joi, { number, string } from "joi";
import path, { join } from "path";
import { Schema } from 'mongoose';
import mongoose from "mongoose";
import { request } from "express";

 const FoodItemSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   imageUrl: {
      type: String,
      required: true,
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
/** This function basically update collections schema key */
FoodItemSchema.path('imageUrl').get( (val: string) => {
//  console.log(request.headers.host,request.headers.origin);
   return  path.basename('assets/banner/images/')+val;
});

FoodItemSchema.set('toJSON', { getters: true, virtuals: false });

const FoodItemValidationSchema = Joi.object({

   title: Joi.string().min(3).required().messages({
      "string.empty": `Title cannot be an empty field`,
      "any.required": `Title is a required.`,
      "string.base": `Title should be a type of text`,
      "string.min": `Title should be a not less than 3 string`,
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
   FoodItemValidationSchema,
   FoodItemSchema
};