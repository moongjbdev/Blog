import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
//=====================================================================//
//Declaration
dotenv.config();

const PORT = process.env.PORT || 3000;
const URI_DB = process.env.URI_DB || "mongodb://localhost:27017";

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(URI_DB).then(() => console.log("Connected to MongoDB, Successfully!")).catch(err => console.log(err));;

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
