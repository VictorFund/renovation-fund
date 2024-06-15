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
        description: {
            type: String,
            required: true,
        },
        descriptionEn: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            enum: ['Announced', 'Current', 'Realized'],
            required: true,
            default: 'Announced',
        },
        startDate: {
            type: Date,
            default: Date.now
        },
        sum: {
            type: String,
            required: true,
        },
        mission: {
            type: String,
            required: true,
        },
        goal: {
            type: String,
            required: true,
        },
        audience: {
            type: String,
            required: true,
        },
        concept: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


//If the collection does not exist - create a new one.
export const Project = mongoose.models?.Project || mongoose.model('Project', projectSchema);