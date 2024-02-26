import EndpointRepository from "@Routes/EndpointRepository.interface";
import RouteGroupingProvider from "@/utils/RouteGroupingProvider";

import UserController from "@/controllers/user.controller";

export default class UserEndpoints implements EndpointRepository {
  public PublicsRoutes(RouteProvider: RouteGroupingProvider) {
    RouteProvider.get("register", UserController.register);
  }

  public ProtectedRoutes(RouteProvider: RouteGroupingProvider) {
    RouteProvider.post("login", (req: any, res: any) => {
      console.log(req.session);
      res.json({ teste: "É só um teste privado Boy" });
    });
  }
}
