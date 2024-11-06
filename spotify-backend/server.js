import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songs.route.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/album.route.js";
import userRouter from "./src/routes/user.route.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());

app.use(cors());

//initializing routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);
app.use("/api/user", userRouter);
app.get("/", (req, res) => res.send("API working"));

app.listen(port, () => console.log(`Server running on port: ${port}`));
