import { Application } from "express";
import EndpointRepository from "@Routes/EndpointRepository.interface";
import RouteGroupingProvider from "@Utils/RouteGroupingProvider";

// Middlewares
import AccessAuth from "@Middlewares/AccessAuth.middleware";

// Endpoints Repositories
import UserEndpoints from "./user.endpoints";

// List of enabled Endpoints Repositories
const EndpointsRepositoryList: EndpointRepository[] = [new UserEndpoints()];

export default class Routes {
  constructor(app: Application) {
    const RouteProvider = new RouteGroupingProvider();

    RouteProvider.group((groupProvider: RouteGroupingProvider) => {
      groupProvider.group(this.PublicsRoutes);
      groupProvider.group(AccessAuth.check, this.ProtectedRoutes);
    });

    app.use(RouteProvider.Router());
  }

  private PublicsRoutes(PublicsRoutesProvider: RouteGroupingProvider): void {
    EndpointsRepositoryList.forEach((EndpointsRepository) =>
      EndpointsRepository.PublicsRoutes(PublicsRoutesProvider)
    );
  }

  private ProtectedRoutes(PublicsRoutesProvider: RouteGroupingProvider): void {
    EndpointsRepositoryList.forEach((EndpointsRepository) =>
      EndpointsRepository.ProtectedRoutes(PublicsRoutesProvider)
    );
  }
}

// app.get("/", async (req: any, res: any) => {
//   try {
//   const user = await User.create({
//     name: "Leandro",
//     login: "leandro.meirelles",
//     password: "123",
//     email: "meirelles@gmail.com",
//     monthlyIncome: 1500.0,
//   });
//   res.json({ id: user.id });
//   const group = await Group.create(
//     {
//       name: "Ola Mundo",
//       createDate: new Date("01-30-2024"),
//       isPersonal: true,
//       description: "É só um teste boy",
//       groupMembers: {
//         userId: 1,
//         level: 6,
//       },
//     },
//     {
//       include: [
//         {
//           model: GroupMembers,
//           as: "groupMembers",
//         },
//       ],
//     }
//   );
//   const group = await Group.findOne({
//     where: { id: 6 },
//     include: [
//       {
//         model: GroupMembers,
//         as: "groupMembers",
//       },
//     ],
//   });
//   if (group) res.json({ group: await group });
//   else throw "ola";
//   } catch (error) {
//     apiErrorHandler(error, req, res, `É só um teste boy`);
//   }
//   apiErrorHandler;
//   res.json({ ola: "ola" });
// });
