import { config as dotenv } from "dotenv";
dotenv();

import express, { Application } from "express";
const app: Application = express();
const port: number = process.env.APP_PORT
  ? parseInt(process.env.APP_PORT, 10)
  : 3000;

import Server from "@/index";
new Server(app);

import { Session } from "@/utils/types/session";
declare global {
  namespace Express {
    export interface Request {
      session?: Session | undefined;
    }
  }
}

app
  .listen(port, "localhost", function () {
    console.info(`Server running on : http://localhost:${port}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("server startup error: address already in use");
    } else {
      console.log(err);
    }
  });
