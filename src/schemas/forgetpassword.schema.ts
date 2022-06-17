import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ForgetPasswordSchema = new Schema({
    token: {
        type: Number,
        required: true,
    },
    valid: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    lastlogindate: {
        type: Date,
        required: true,
    },
}, { timestamps: true }
);


export {
    ForgetPasswordSchema
}