"use server"
import { getDashboardSession } from "./getDashboardSession"

export const checkIsOwner = async () => {
    const session = await getDashboardSession();
    const isOwner = session.user.email === process.env.NEXT_PUBLIC_OWNER;
    console.log('isOwner', isOwner)
    return isOwner;
}