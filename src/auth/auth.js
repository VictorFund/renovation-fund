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
            throw new Error("Wrong credentials")
        }

        const passwordIsCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!passwordIsCorrect) {
            throw new Error("Wrong credentials")
        }

        return user;
    } catch (error) {
        console.log('error', error);
        throw new Error("Failed to login")
    }
}


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut } = NextAuth({
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
