import mongoose from 'mongoose';


const newsSchema = new mongoose.Schema(
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
        description: {
            type: String,
            required: true,
        },
        descriptionEn: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


//If the collection does not exist - create a new one.
export const News = mongoose.models?.News || mongoose.model('News', newsSchema);