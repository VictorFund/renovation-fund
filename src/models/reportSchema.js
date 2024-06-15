import mongoose from 'mongoose';


const reportSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        titleEn: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
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
        file: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


//If the collection does not exist - create a new one.
export const Report = mongoose.models?.Report || mongoose.model('Report', reportSchema);