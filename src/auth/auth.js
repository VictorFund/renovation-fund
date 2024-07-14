import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDB } from "@/utils/connectToDB"
import { User } from "@/models/userSchema"
import { authConfig } from './auth.config'


// вынесено в отдельную функцию
const login = async (credentials) => {
    try {
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
            throw new Error("Неправильні облікові дані")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Неправильні облікові дані")
        }

        return user;
    } catch (error) {
        console.log('error', error);

        throw new Error("Не вдалося увійти")
    }
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    // login из этого файла(т.е. из auth.js)
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    console.log("error", error)
                    return null;
                }
            }
        })],
    callbacks: {
        ...authConfig.callbacks,
    },
})