import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { News } from "@/models/newsSchema";


export const GET = async (request, { params }) => {
    const { slug } = params;

    try {
        await connectToDB();

        const data = await News.findOne({ slug });
        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}


export const DELETE = async (request, { params }) => {
    const { slug } = params;

    try {
        await connectToDB();

        await News.deleteOne({ slug });

        return new NextResponse("News has been deleted.", { status: 200 })

    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}


export const PUT = async (request, { params }) => {
    const { slug } = params;
    const incomingData = await request.json();

    try {
        await connectToDB();

        const updatedNews = await News.findOneAndUpdate({ slug }, incomingData);

        if (!updatedNews) {
            return new NextResponse("News not found", { status: 404 });
        }

        return new NextResponse("News has been updated", { status: 200 });

    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
};


export const PATCH = async (request, { params }) => {
    const { slug } = params;
    const incomingData = await request.json();

    try {
        await connectToDB();

        const updatedNews = await News.findOneAndUpdate({ slug }, incomingData);

        if (!updatedNews) {
            return new NextResponse("News not found", { status: 404 });
        }
        return new NextResponse("News has been updated", { status: 200 });

    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
};