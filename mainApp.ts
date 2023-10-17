import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { mainError, HTTP } from "./error/mainError";
import { errorHandler } from "./error/errorHandler";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
  );

  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "welcome Home",
      });
    } catch (error) {
      return res.status(404).json({
        message: "an error has occured",
      });
    }
  });

  app.use("/api/v1/");
  app.use("/api/v1/");

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Router Error",
        message: `This Error is coming up because the ${req.originalUrl} url isn't correct!!!`,
        status: HTTP.BAD_REQUEST,
        success: false,
      })
    );
  });
  app.use(errorHandler );
};
