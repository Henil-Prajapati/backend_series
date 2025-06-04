import express from 'express';
import cors from 'cors';
import { UploadOnCloudinary } from './utils/cloudinary.js';
import cookieParser from 'cookie-parser';

const app = express();  

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
    credentials: true
}))

app.use(express.json({
    limit: '16kb'
}));    

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));
app.use(express.static('public'));
app.use(cookieParser());


// Import routes
import userRoutes from './routes/user.routes.js';


//routed declaration
app.use("/api/v1/users", userRoutes);

export default app;