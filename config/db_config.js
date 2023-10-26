import mongoose from "mongoose";
import "dotenv/config.js";

// connection function
export const connectDb = async () => {
  try {
    const responce = await mongoose.connect(process.env.DB_URL, {
      dbName: "E-com_db",
    });
    const { port } = responce.connection;
    console.log(`db connect at port ${port}`);
  } catch (error) {
    console.log(`=>error something went wrong ${error}`);
  }
};
