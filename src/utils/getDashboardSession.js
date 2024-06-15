"use server"
import { auth } from "@/auth/auth";


export const getDashboardSession = async () => {
    const session = await auth();
    return session;
}