//<--- import packages --->
import express from "express";
import cors from "cors";
import morgan from "morgan";
import productRoutes from "./routes/Prod_Rou.js";
import bodyParser from "body-parser";
import { connectDb } from "./config/db_config.js";

// store variable
const app = express();

// connection db func
connectDb();

// setting middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// setting route
app.use("/products", productRoutes);

// error handling global custom middleware

app.use((err, request, responce, next) => {
  let copyErr = Object.assign({}, err);
  // const copyErr = { ...error };
  copyErr.message = err.message;

  //note: validation handler
  if (err.name === "ValidationError") {
    const mess = Object.values(err.errors).map((item) => item.message);
    copyErr = new Error(mess);
  }

  //note: duplicate value handler
  if (err.code === 11000) {
    const dupVal = `Duplicate:${Object.keys(err.keyValue)}`;
    copyErr = new Error(dupVal);
  }

  //note: cast error handler
  if (err.name === "CastError") {
    const mess = `Reseource not found :invalid ${err.path}`;
    copyErr = new Error(mess);
  }

  responce.json({
    err: copyErr.message,
  });
});

// port number
const port = 8000;

// listing port
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
