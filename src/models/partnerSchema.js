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
        isMainPartner: {
            type: Boolean,
            default: false,
        },
        logo: {
            type: String,
        },
        siteLink: {
            type: String,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
        editor: {
            type: String,
        },
    },
    { timestamps: true }
);


//If the collection does not exist - create a new one.
export const Partner = mongoose.models?.Partner || mongoose.model('Partner', partnerSchema);