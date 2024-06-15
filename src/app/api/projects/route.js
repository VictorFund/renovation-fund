import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { Project } from "@/models/projectSchema";


export const GET = async (request) => {
    try {
        await connectToDB();

        const data = await Project.find();

        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log("error", error)
        return new NextResponse('Database error', { status: 500 })
    }
}


export const POST = async (request) => {
    const body = await request.json();

    const newProject = new Project(body);

    try {
        await connectToDB();

        await newProject.save();

        return new NextResponse('Project has been created.', { status: 201 });
    } catch (err) {
        return new NextResponse(err, { status: 500 });
    }
};