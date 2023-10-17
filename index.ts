import express, { Application } from "express";
import dotenv from "dotenv";
import { db } from "./utils/db";
import { mainApp } from "./mainApp";
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT!);

mainApp(app);
const server = app.listen(port, () => {
  console.log("");
  db();
});

process.on("uncaughtException", (error: any) => {
  console.log("server is shutting down due to uncaughtException");
  console.log(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("server is shutting down due to unhandledRejection");
  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
