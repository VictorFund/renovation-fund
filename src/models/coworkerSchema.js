import mongoose from 'mongoose';


const coworkerSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        nameEn: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        descriptionEn: {
            type: String,
            required: true,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);


export const Coworker = mongoose.models?.Coworker || mongoose.model('Coworker', coworkerSchema);
