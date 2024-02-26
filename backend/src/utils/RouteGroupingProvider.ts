import { IRouter as IExpressRouter, RequestHandler, Router } from "express";

type GroupCallback = (router: RouteGroup) => void;

export default class RouteGroup {
  private head: string;
  public router: IExpressRouter;
  private middlewares: RequestHandler[] = [];

  constructor(
    router: IExpressRouter = Router(),
    path: string = "/",
    middlewares?: RequestHandler[] | RequestHandler
  ) {
    this.head = path;
    this.router = router;

    if (middlewares)
      this.middlewares = Array.isArray(middlewares)
        ? middlewares
        : [middlewares];
  }

  public use(...routers: Router[]) {
    routers.forEach((router) => this.router.use(router));
  }

  public Router(): IExpressRouter {
    return this.router;
  }

  public group(
    ...args:
      | [path: string, middleware: RequestHandler, fn: GroupCallback]
      | [middleware: RequestHandler, fn: GroupCallback]
      | [path: string, fn: GroupCallback]
      | [fn: GroupCallback]
  ) {
    let path: string = "",
      middlewares: RequestHandler[] = [],
      middleware: RequestHandler,
      fn: GroupCallback;

    if (args.length === 3) {
      [path, middleware, fn] = args;

      middlewares = [...this.middlewares, middleware];
    } else if (args.length === 2) {
      if (typeof args[0] === "string") [path, fn] = args;
      else {
        [middleware, fn] = args;
        middlewares = [...this.middlewares, middleware];
      }
    } else fn = args[0];

    fn(
      new RouteGroup(
        this.router,
        this.normalizeRoute(this.head, path),
        middlewares
      )
    );
  }

  private normalizeRoute(...paths: string[]): string {
    const concatenatedPath = paths.join("/");
    return "/" + concatenatedPath.replace(/^\/+|\/+(?=\/)/g, "");
  }

  private callRouter(method: string, path: string, operation: RequestHandler) {
    switch (method) {
      case "get":
        this.router.get(
          this.normalizeRoute(this.head, path),
          ...this.middlewares,
          operation
        );
        break;
      case "post":
        this.router.post(
          this.normalizeRoute(this.head, path),
          ...this.middlewares,
          operation
        );
        break;
      case "put":
        this.router.put(
          this.normalizeRoute(this.head, path),
          ...this.middlewares,
          operation
        );
        break;
      case "patch":
        this.router.patch(
          this.normalizeRoute(this.head, path),
          ...this.middlewares,
          operation
        );
        break;
      case "delete":
        this.router.delete(
          this.normalizeRoute(this.head, path),
          ...this.middlewares,
          operation
        );
        break;
      default:
        throw "The method is not available";
        break;
    }
  }

  public get(path: string, handler: RequestHandler) {
    this.callRouter("get", path, handler);
  }

  public post(path: string, handler: RequestHandler) {
    this.callRouter("post", path, handler);
  }

  public put(path: string, handler: RequestHandler) {
    this.callRouter("put", path, handler);
  }

  public patch(path: string, handler: RequestHandler) {
    this.callRouter("patch", path, handler);
  }

  public delete(path: string, handler: RequestHandler) {
    this.callRouter("delete", path, handler);
  }
}
