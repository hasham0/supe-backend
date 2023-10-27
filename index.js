//<--- import packages --->
import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/Prod_Rou.js";
import bodyParser from "body-parser";
import { connectDb } from "./config/db_config.js";
import { errorsMid } from "./middlewares/errorMid.js";
import "dotenv/config.js";

// store variable
const app = express();

// connection db func
connectDb();

// setting middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// setting route
app.use("/products", productRoutes);

// error handling global custom middleware
app.use(errorsMid);

// listing port
app.listen(process.env.SERVER_PORT, () => {
  console.log(`server running on port ${process.env.SERVER_PORT}`);
});
