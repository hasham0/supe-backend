//<--- import packages --->
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config.js";

import productRoutes from "./routes/Prod_Rou.js";
import usersRoutes from "./routes/Auth_Rou.js";
import { connectDb } from "./config/db_config.js";
import { errorsMid } from "./middlewares/errorMid.js";

// store variable
const app = express();

// connection db function
(() => connectDb())();

// setting middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// setting route
app.use("/products", productRoutes);
app.use("/users", usersRoutes);

// error handling global custom middleware
app.use(errorsMid);

// listing port
app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`);
});
