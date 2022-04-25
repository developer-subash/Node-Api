import Joi from "joi";
import { Schema } from 'mongoose';

const RoleSchema = new Schema({
   name: {
       type: String,
       required: true,
       unique: true
   }
}, { timestamps: true }
);

const RoleValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.empty": `Name cannot be an empty field`,
            "any.required": `Name is a required.`,
            "string.base": `Name should be a type of text`,
            "string.min": `Name should be a not less than 3 string`,
        })
});

export  {
    RoleValidationSchema,
    RoleSchema
}