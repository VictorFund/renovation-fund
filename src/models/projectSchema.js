import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema(
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
        shortDescription: {
            type: String,
            required: true,
        },
        shortDescriptionEn: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            enum: ['Анонсований', 'Поточний', 'Реалізований'],
            required: true,
            default: 'Анонсований',
        },
        startDate: {
            type: String,
        },
        sum: {
            type: String,
        },
        payLink: {
            type: String,
        },
        mission: {
            type: String,
            required: true,
        },
        missionEn: {
            type: String,
            required: true,
        },
        goal: {
            type: String,
            required: true,
        },
        goalEn: {
            type: String,
            required: true,
        },
        audience: {
            type: String,
            required: true,
        },
        audienceEn: {
            type: String,
            required: true,
        },
        concept: {
            type: String,
            required: true,
        },
        conceptEn: {
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
        link: {
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
export const Project = mongoose.models?.Project || mongoose.model('Project', projectSchema);