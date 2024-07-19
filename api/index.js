import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import postRoutes from "./routes/postRoute.js";
import commentRoutes from "./routes/commentRoute.js";

import cookieParser from 'cookie-parser';
//=====================================================================//
//Declaration
dotenv.config();

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.URI_DB || "mongodb://localhost:27017";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(URI_DB).then(() => console.log("Connected to MongoDB, Successfully!")).catch(err => console.log(err));;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);



// Middleware for error handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error -- from MoongJB";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: `${message} ^.^ <3 MoongJBdev`
    });
});
