import mongoose from "mongoose";

// username and password
const mongo_username = `hashamsaleem75`;
const mongo_password = `Zhh2DH7JWyF79SMw`;

//db url connection
const db_url = `mongodb+srv://${mongo_username}:${mongo_password}@cluster1.drzkuea.mongodb.net/?retryWrites=true&w=majority`;

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
