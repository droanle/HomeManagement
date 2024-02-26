import RouteGroupingProvider from "@/utils/RouteGroupingProvider";

export default interface EndpointRepository {
  PublicsRoutes(RouteProvider: RouteGroupingProvider): void;
  ProtectedRoutes(RouteProvider: RouteGroupingProvider): void;
}
