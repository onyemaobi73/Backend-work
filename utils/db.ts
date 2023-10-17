import mongoose from "mongoose";
import env from "dotenv";
env.config();

export const db = () => {
  mongoose
    .connect(process.env.DB!)
    .then(() => {
      console.log("connected😎😎");
    })
    .catch((error: Error) => {
      console.log(error);
    });
};
