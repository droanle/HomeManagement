import User from "@/models/User/User";
import { Request, Response, NextFunction } from "express";

class AccessAuth {
  public check(req: Request, res: Response, next: NextFunction) {
    console.log("oi meu chapa");

    req.session = {
      instance: new User(),
      sessionStartDate: new Date(),
    };

    next();
  }
}

export default new AccessAuth();
