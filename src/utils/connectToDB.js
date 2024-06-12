const { default: mongoose } = require("mongoose");

const connection = {};

export const connectToDB = async () => {
    try {
        if (connection.isConnected) {
            return;
        }
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        throw new Error(error)
    }
}