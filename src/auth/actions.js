"use server"
import bcrypt from "bcryptjs";
import { connectToDB } from "@/utils/connectToDB"
import { User } from "@/models/userSchema"
import { signIn, signOut } from "./auth";


// previousState - инф-ция об ошибках для useFormState
export const register = async (previousState, formData) => {
    console.log('formData', formData)
    const { name, email, password } = Object.fromEntries(formData);
    try {
        await connectToDB();

        const user = await User.findOne({ email });
        if (user) {
            return { error: "User already exists" }
        }

        // добавлено для проверки. должно и без него работать
        if (password === "") {
            return { error: "Something went wrong" }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            slug: email,
            name,
            email,
            password: hashedPassword,
        })
        console.log('newUser', newUser)
        await newUser.save();
        // for visualization success or errors in state of useFormState
        return { success: true };
    } catch (error) {
        console.log("error in actions REGister", error);
        return { error: "Something went wrong" }
    }
}


// используется в loginForm. вызывается signIn из auth.js (передавая credentials). там выполняется алгоритм в части CredentialsProvider
export const login = async (previousState, formData) => {
    console.log('formData', formData)
    const { email, password } = Object.fromEntries(formData);
    try {
        await signIn("credentials", { email, password })

    } catch (error) {
        console.log("error in actions LOGin", error)
        // проверка на ошибку, чтобы вывести спец сообщение "Invalid username or password" с помощью useFormState в поле ошибки в loginForm
        if (error.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password" };
        }
        // return { error: "Something went wrong" } был заменён на написанное ниже, чтобы исключить ошибку NEXT_REDIRECT при правильно введённых логине и пароле
        throw error;
    }
}


export const handleLogout = async () => {
    "use server"
    await signOut();
}