import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { Report } from "@/models/reportSchema";


export const GET = async (request) => {
    try {
        await connectToDB();

        const data = await Report.find();

        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new NextResponse('Database error', { status: 500 })
    }
}


export const POST = async (request) => {
    const body = await request.json();

    const newReport = new Report(body);

    try {
        await connectToDB();
        await newReport.save();

        return new NextResponse('Report has been created.', { status: 201 });
    } catch (err) {
        return new NextResponse(err, { status: 500 });
    }
};