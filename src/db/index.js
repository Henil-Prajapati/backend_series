import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://henil123:henil123@cluster.n8oihv8.mongodb.net/videotube', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("+ to MongoDB...", connectionInstance.connection.models);
        console.log(`✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection FAILED:", error);
        process.exit(1);
    }
};

export default connectDB;
