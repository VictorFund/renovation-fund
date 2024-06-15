import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { Report } from "@/models/reportSchema";


export const GET = async (request, { params }) => {
    const { slug } = params;

    try {
        await connectToDB();

        const data = await Report.findOne({ slug });

        return new NextResponse(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
}

export const DELETE = async (request, { params }) => {
    const { slug } = params;

    try {
        await connectToDB();

        await Report.deleteOne({ slug });

        return new NextResponse("Report has been deleted", { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}


export const PUT = async (request, { params }) => {
    const { slug } = params;
    const incomingData = await request.json();

    try {
        await connectToDB();

        const updatedReport = await Report.findOneAndUpdate({ slug }, incomingData);

        if (!updatedReport) {
            return new NextResponse("Report not found", { status: 404 });
        }

        return new NextResponse("Report has been updated", { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
};


export const PATCH = async (request, { params }) => {
    const { slug } = params;
    const incomingData = await request.json();

    try {
        await connectToDB();

        const updatedReport = await Report.findOneAndUpdate({ slug }, incomingData);

        if (!updatedReport) {
            return new NextResponse("Report not found", { status: 404 });
        }

        return new NextResponse("Report has been updated", { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
};