import mongoose from "mongoose";
import "dotenv/config.js";

//db url connection
const db_url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster1.drzkuea.mongodb.net/?retryWrites=true&w=majority`;

// connection function
export const connectDb = async () => {
  try {
    const responce = await mongoose.connect(db_url, {
      dbName: "E-com_db",
    });
    const { port } = responce.connection;
    console.log(`db connect at port ${port}`);
  } catch (error) {
    console.log(`=>error something went wrong ${error}`);
  }
};
