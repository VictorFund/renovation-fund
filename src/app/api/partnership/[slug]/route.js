import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { Partner } from "@/models/partnerSchema";


export const GET = async (request, { params }) => {
    const { slug } = params;

    try {
        await connectToDB();

        const data = await Partner.findOne({ slug });
        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}


export const DELETE = async (request, { params }) => {
    const { slug } = params;

    try {
        await connectToDB();

        await Partner.deleteOne({ slug });

        return new NextResponse("Partner has been deleted.", { status: 200 })

    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}


export const PUT = async (request, { params }) => {
    const { slug } = params;
    const incomingData = await request.json();

    try {
        await connectToDB();

        const updatedPartner = await Partner.findOneAndUpdate({ slug }, incomingData);

        if (!updatedPartner) {
            return new NextResponse("Partner not found", { status: 404 });
        }

        return new NextResponse("Partner has been updated", { status: 200 });

    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
};