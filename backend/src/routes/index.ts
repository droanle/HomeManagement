import { Application } from "express";
import { apiErrorHandler } from "@/handlers/errorHandler";
import User from "@/models/User/User";

export default class Routes {
  constructor(app: Application) {
    app.get("/", async (req: any, res: any) => {
      try {
        const user = await User.create({
          name: "Leandro",
          login: "leandro.meirelles",
          password: "123",
          email: "meirelles@gmail.com",
          monthlyIncome: 1500.0,
        });

        res.json({ id: user.id });
      } catch (error) {
        apiErrorHandler(error, req, res, `É só um teste boy`);
      }

      // apiErrorHandler;
      // res.json({ ola: "ola" });
    });
  }
}
