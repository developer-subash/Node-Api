import Joi from "joi";
import { Schema } from 'mongoose';
import { Constants } from "../utils/constants";

const PermissionSchema = new Schema({
    name: {
        type: String,
        enum: [Constants.PermissionNames.CanView, Constants.PermissionNames.CanDelete, Constants.PermissionNames.CanEdit],
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true }
);

const PermissionValidationSchema = Joi.object({
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
    PermissionValidationSchema,
    PermissionSchema
}