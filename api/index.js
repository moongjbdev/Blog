import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
//=====================================================================//
//Config
dotenv.config();

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.URI_DB || "mongodb://localhost:27017";

// Connect to MongoDB
mongoose.connect(URI_DB).then(() => console.log("Connected to MongoDB, Successfully!")).catch(err => console.log(err));;
const app = express();

// Routes
app.use('/api/user', userRoutes);



app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
