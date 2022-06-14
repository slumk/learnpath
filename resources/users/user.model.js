import mongoose from 'mongoose'
import { validateEmail } from "./validators/validate_email";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        maxlength: "20",
        required: true
    },
    lastName: {
        type: String,
        maxlength: "20",
        required: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'MOD', 'TEACHER', 'LEARNER'],
        required: true
    },
    email: {
        type: String,
        validate: validateEmail,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F', 'T', 'O']
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        maxlength: 10,
        required: () => {
            return this.role === 'MOD' || this.role === 'TEACHER'
        }
    }
}, { timestamps: true })

export const userModel = new mongoose.model('User', userSchema)