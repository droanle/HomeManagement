import { Application, json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import Routes from "@Routes/index";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
    this.statusScenario(app);
  }

  public statusScenario(app: Application): void {
    app.use((req: any, res: any) =>
      res.status(404).json({
        error: true,
        details: {
          code: 404,
          message: "Resource not found",
        },
      })
    );
  }

  public config(app: Application): void {
    app.use(helmet());
    app.use(cors());

    app.use(json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
  }
}
