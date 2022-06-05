import Joi, { boolean, number, string } from "joi";
import path, { join } from "path";
import { Schema } from 'mongoose';
import mongoose from "mongoose";


const UserForgetPasswordSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    lastRequestedDate: {
        type: Date,
        default: Date.now()
    },
    requestOtp: {
        type: string
    },
    is_valid: {
        type: boolean,
        default: false
    }

}, { timestamps: true }
);


export {
    UserForgetPasswordSchema
};