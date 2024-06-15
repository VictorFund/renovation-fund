import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { Partner } from "@/models/partnerSchema";


export const GET = async (request) => {
    try {
        await connectToDB();

        const data = await Partner.find();

        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        console.log("error", error)
        return new NextResponse('Database error', { status: 500 })
    }
}


export const POST = async (request) => {
    const body = await request.json();

    const newPartner = new Partner(body);

    try {
        await connectToDB();

        await newPartner.save();

        return new NextResponse('Partner has been created.', { status: 201 });
    } catch (err) {
        return new NextResponse(err, { status: 500 });
    }
};