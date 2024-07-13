import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            // required: true,
            // unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// If the collection does not exist - create a new one.
export const User = mongoose.models?.User || mongoose.model('User', userSchema);