import mongoose, { Document, Schema } from 'mongoose';

export interface IUserForgetPassword extends Document {
    user: string,
    lastRequestedDate: Date,
    requestOtp: {
        type: string,
        maxLength: 6,
    },
    is_valid: {
        type: boolean,
        default: false
    }
  }