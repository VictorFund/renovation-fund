import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// If the collection does not exist - create a new one.
export const User = mongoose.models?.User || mongoose.model('User', userSchema);