import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { Coworker } from "@/models/coworkerSchema";


export const GET = async (request) => {
    try {
        await connectToDB();

        const data = await Coworker.find();

        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new NextResponse('Database error', { status: 500 })
    }
}


export const POST = async (request) => {
    const body = await request.json();

    const newCoworker = new Coworker(body);

    try {
        await connectToDB();
        await newCoworker.save();

        return new NextResponse('Coworker has been created.', { status: 201 });
    } catch (err) {
        return new NextResponse(err, { status: 500 });
    }
};