import { query } from "express";

export default class UserController {
  static register(req: any, res: any) {
    console.log(req.boby);
    console.log(req.params);
    console.log(req.query);

    //   boby
    //   params
    //   query

    res.json({ teste: "É só um teste Boy" });
  }
}
