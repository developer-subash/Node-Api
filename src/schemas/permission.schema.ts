import Joi from "joi";
import mongoose from "mongoose";
import { Schema } from 'mongoose';
import { Constants } from "../utils/constants";

const PermissionSchema = new Schema({
    name: {
        type: String,
        enum: [Constants.PermissionNames.CanView, Constants.PermissionNames.CanDelete, Constants.PermissionNames.CanEdit],
        required: true,
        unique: true
    },
    roles: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: true
    },
    modelName: String,
    permissionTxt: String,
}, { timestamps: true }
);

const PermissionValidationSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": `Name cannot be an empty field`,
            "any.required": `Name is a required.`,
            "string.base": `Name should be a type of text`,
        }),
    modelName: Joi.string()
        .required()
        .messages({
            "string.empty": `Model Name cannot be an empty field`,
            "any.required": `Model Name is a required.`,
            "string.base": `Model Name should be a type of text`,
        }),
    permissionTxt: Joi.string()
        .required()
        .messages({
            "string.empty": `permissionTxt cannot be an empty field`,
            "any.required": `permissionTxt is a required.`,
            "string.base": `permissionTxt should be a type of text`,
        }),
            

});

export  {
    PermissionValidationSchema,
    PermissionSchema
}