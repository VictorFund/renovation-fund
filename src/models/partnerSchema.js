import mongoose from 'mongoose';


const partnerSchema = new mongoose.Schema(
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
        // image: {
        //     type: String,
        //     required: true,
        // },
        description: {
            type: String,
            required: true,
        },
        descriptionEn: {
            type: String,
            required: true,
        },
        siteLink: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


//If the collection does not exist - create a new one.
export const Partner = mongoose.models?.Partner || mongoose.model('Partner', partnerSchema);