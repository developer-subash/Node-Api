import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHERS'], default: 'MALE' },
    Role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: '' }
}, { timestamps: true }
);