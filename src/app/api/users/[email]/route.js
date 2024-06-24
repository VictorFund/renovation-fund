import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { User } from "@/models/userSchema";


export const revalidate = 0;


export const DELETE = async (request, { params }) => {
    const { email } = params;

    try {
        await connectToDB();

        await User.deleteOne({ email });

        return new NextResponse("User has been deleted", { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}


export const PATCH = async (request, { params }) => {
    const { email } = params;
    const incomingData = await request.json();

    try {
        await connectToDB();

        const updatedUser = await User.findOneAndUpdate({ email }, incomingData);

        if (!updatedUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse("User has been updated", { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }
};