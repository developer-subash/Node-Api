import Joi from "joi";
import { Schema } from 'mongoose';

const CategorySchema = new Schema({
   title: {
       type: String,
       required: true
   }
}, { timestamps: true }
);

const CategoryValidationSchema = Joi.object({
   title: Joi.string().min(3).required().messages({
            "string.empty": `Title cannot be an empty field`,
            "any.required": `Title is a required.`,
            "string.base": `Title should be a type of text`,
            "string.min": `Title should be a not less than 3 string`,
         })
});

export  {
   CategoryValidationSchema,
   CategorySchema
}