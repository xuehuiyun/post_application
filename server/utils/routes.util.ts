import { Router, Response, Request, NextFunction } from "express";
import "reflect-metadata";
import * as core from "express-serve-static-core";
import * as Log from "./log.util";
import { ZodError, ZodSchema } from "zod";
import { BadRequestResponse } from "./response.util";

const ROUTES_META_KEY = "express:routes";
const GLOBAL_META_KEY = "express:global";

type MiddlewareFunc = (req: Request, res: Response, next: NextFunction) => void;
type ClassConstructor = new (...args: any[]) => {};
enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch",
    OPTIONS = "options",
    HEAD = "head"
}

interface RouteMeta {
    method: HttpMethod;
    path: string;
    handler: (req: Request, res: Response) => void;
    middleware?: MiddlewareFunc[];
    hasValidation?: boolean;
}

interface GlobalMeta {
    middleware?: MiddlewareFunc[];
    hasValidation?: boolean;
}

/**
 * Instantiates a class decorated with the ExpressRouter decorator and returns the router.
 *
 * @param ExportedClass The class to export.
 * @returns An Express router.
 */
export function asRouter(ExportedClass: ClassConstructor): Router {
    const toExport = new ExportedClass() as { router: Router };

    return toExport.router;
}

/**
 * Decorator that declares a class as an Express Router.
 *
 * Will use route meta defined by decorators on class methods to create a new router member on the class.
 *
 * Route decorators: {@link Get}, {@link Post}, {@link Patch}, {@link Delete}, {@link Put}
 *
 * Validation decorator: {@link Validate}
 *
 * Generic middleware decorator: {@link Middleware}
 *
 * @param {string} [basePath] The base path the router will be mounted on. If the router has no base path to be mounted on the basePath argument should be omitted.
 */
export function ExpressRouter(basePath?: string) {
    return function declareRoute<T extends ClassConstructor>(
        constructor: T
    ): T {
        if (basePath === "/" || basePath === "") {
            throw Error(
                "ExpressRouter declaration with no base path should omit the basePath argument instead of passing a single forward slash or empty string."
            );
        }

        if (!basePath) {
            basePath = "";
        }

        const router = Router();

        // Setup routes
        const routes = Reflect.getMetadata(
            ROUTES_META_KEY,
            constructor.prototype
        ) as Record<string, RouteMeta>;

        for (const fnName in routes) {
            const routeData = routes[fnName];

            const middlewareChain = [...(routeData?.middleware ?? [])];

            if (!routeData.handler || !routeData.method || !routeData.path) {
                throw Error(
                    `Missing required route data during initialization. Check if route decorator is being used on class method: ${fnName}`
                );
            }

            middlewareChain.push(asyncErrHandler(routeData.handler));

            // Assign them to the express router
            router[routeData.method](
                `${basePath}${routeData.path}`,
                ...middlewareChain
            );
        }

        return class extends constructor {
            router: Router = router;
        };
    };
}

/**
 * A wrapper to handle async function errors.
 *
 * Errors thrown in asynchronous functions will not be gracefully handled by the built-in error middleware (or any custom ones).
 *
 * This wrapper will catch errors thrown from asynchrnous functions and pass the error correctly to the next function.
 *
 * As of writing this Express v5 (which does support thrown errors in async functions) is still in beta.
 *
 * @param fn The middleware function to wrap.
 * @returns A new express middleware handler that will gracefully handle errors from async function calls.
 */
function asyncErrHandler(fn: (...args: any[]) => Promise<void> | void) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
}

/**
 * Decorator that declares a class method as an HTTP GET route.
 *
 * The given path will be used as the mount point and the class method will be used as the request handler.
 *
 * Equivalent to router.put(path, classMethod).
 *
 * @param path The path for this route.
 */
export function Get(path: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        generateRouteMeta(
            HttpMethod.GET,
            path,
            target,
            propertyKey,
            descriptor
        );
    };
}

/**
 * Decorator that declares a class method as an HTTP PUT route.
 *
 * The given path will be used as the mount point and the class method will be used as the request handler.
 *
 * Equivalent to router.put(path, classMethod).
 *
 * @param path The path for this route.
 */
export function Put(path: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        generateRouteMeta(
            HttpMethod.PUT,
            path,
            target,
            propertyKey,
            descriptor
        );
    };
}

/**
 * Decorator that declares a class method as an HTTP POST route.
 *
 * The given path will be used as the mount point and the class method will be used as the request handler.
 *
 * Equivalent to router.post(path, classMethod).
 *
 * @param path The path for this route.
 */
export function Post(path: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        generateRouteMeta(
            HttpMethod.POST,
            path,
            target,
            propertyKey,
            descriptor
        );
    };
}

/**
 * Decorator that declares a class method as an HTTP PATCH route.
 *
 * The given path will be used as the mount point and the class method will be used as the request handler.
 *
 * Equivalent to router.patch(path, classMethod).
 *
 * @param path The path for this route.
 */
export function Patch(path: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        generateRouteMeta(
            HttpMethod.PATCH,
            path,
            target,
            propertyKey,
            descriptor
        );
    };
}

/**
 * Decorator that declares a class method as an HTTP DELETE route.
 *
 * The given path will be used as the mount point and the class method will be used as the request handler.
 *
 * Equivalent to router.delete(path, classMethod).
 *
 * @param path The path for this route.
 */
export function Delete(path: string) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        generateRouteMeta(
            HttpMethod.DELETE,
            path,
            target,
            propertyKey,
            descriptor
        );
    };
}

function generateRouteMeta(
    method: HttpMethod,
    path: string,
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    if (!path.startsWith("/")) {
        throw Error(
            "Paths passed to a route decorator must start with a forward slash."
        );
    }

    let currentRoutes = Reflect.getMetadata(ROUTES_META_KEY, target);

    if (!currentRoutes) {
        currentRoutes = {};
        Reflect.defineMetadata(ROUTES_META_KEY, currentRoutes, target);
    }

    const routeHandler: RouteMeta = {
        method,
        path,
        handler: descriptor.value
    };

    if (currentRoutes[propertyKey]) {
        currentRoutes[propertyKey] = {
            ...currentRoutes[propertyKey],
            ...routeHandler
        };
    } else {
        currentRoutes[propertyKey] = routeHandler;
    }
}

// Injects class level middleware meta onto the given target.
function addClassMiddleware(middleware: MiddlewareFunc[], target: any): void {
    let globalMeta = Reflect.getMetadata(GLOBAL_META_KEY, target) as GlobalMeta;

    if (!globalMeta) {
        globalMeta = {};
        Reflect.defineMetadata(GLOBAL_META_KEY, globalMeta, target);
    }

    if (globalMeta.middleware) {
        globalMeta.middleware = globalMeta.middleware.concat(middleware);
    } else {
        globalMeta.middleware = middleware;
    }
}

// Injects route level middleware meta onto the given target.
function addMethodMiddleware(
    middleware: MiddlewareFunc[],
    target: any,
    propertyKey: string
): void {
    let currentRoutes = Reflect.getMetadata(ROUTES_META_KEY, target);
    if (!currentRoutes) {
        currentRoutes = {};
        Reflect.defineMetadata(ROUTES_META_KEY, currentRoutes, target);
    }

    if (!currentRoutes[propertyKey]) {
        currentRoutes[propertyKey] = {};
    }

    const routeMeta = currentRoutes[propertyKey] as RouteMeta;
    if (routeMeta.middleware) {
        routeMeta.middleware = routeMeta.middleware.concat(middleware);
    } else {
        routeMeta.middleware = middleware;
    }
}

export type ProductRequest<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>
> = Request<P, ResBody, ReqBody, ReqQuery, Locals> & {
    productName: string;
};

function zodValidationMiddleware(validation: ZValidationInput) {
    return (req: Request, res: Response, next: NextFunction) => {
        Log.info("In zod validation middleware");

        try {
            const keys = Object.keys(validation) as Array<
                keyof typeof validation
            >;

            for (const k of keys) {
                Log.info("Validation keys: ", k, keys);

                if (k === "custom") {
                    validation[k]?.forEach((cValidator) => {
                        const cResult = cValidator.schema.parse(
                            cValidator.selector(req)
                        );

                        Log.info("Custom parse result: ", cResult);
                    });
                } else {
                    const result = validation[k]?.parse(req[k]);
                    Log.info("Parse result: ", result);
                }
            }

            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errMsg = err.issues.map(
                    (iss) => `${iss.path.toString()}: ${iss.message}`
                );

                Log.info(
                    "Bad request (Zod Middleware) :: ",
                    {
                        URL: req.originalUrl,
                        body: req.body,
                        headers: req.headers,
                        params: req.params,
                        query: req.query
                    },
                    errMsg
                );

                res.send(BadRequestResponse(errMsg));
            } else {
                Log.error(err);
                throw Error("Critical: Unknown error during zod validation.");
            }
        }
    };
}

export interface ZValidationInput {
    /** Validates req.body against the given ZodSchema. */
    body?: ZodSchema;
    /** Validates req.params against the given ZodSchema. */
    params?: ZodSchema;
    /** Validates req.query against the given ZodSchema. */
    query?: ZodSchema;
    /** Validates req.headers against the given ZodSchema. */
    headers?: ZodSchema;
    /**
     * For custom validations not on req.body, req.params, req.query, or req.headers.
     *
     * Takes an array of custom validations which include a selector function and the ZodSchema to validate against.
     */
    custom?: Array<{
        selector: (req: Request) => any;
        schema: ZodSchema;
    }>;
}

export function Middleware(middleware: MiddlewareFunc[]) {
    return function (target: any, propertyKey: string): void {
        if (!propertyKey) {
            addClassMiddleware(middleware, target.prototype);
        } else {
            addMethodMiddleware(middleware, target, propertyKey);
        }
    };
}

export function ZValidate(validation: ZValidationInput): Function {
    return Middleware([zodValidationMiddleware(validation)]);
}
