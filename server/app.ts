/* eslint-disable import/first */
import * as dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { CONFIG } from "./conf/config";
import * as Log from "./utils/log.util";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import router from "./routes/index";
import { InternalErrorResponse, NotFoundResponse } from "./utils/response.util";
import { safeJsonParse } from "./utils/data.util";

const app = express();

app.get("/hc", (req: express.Request, res: express.Response) => {
    console.log("checking");
    res.end("OKk");
});

app.listen(CONFIG.PORT, () => {
    Log.info(`Server start up, running on port: ${CONFIG.PORT}`);
});

// =============================== //
// Middlewares
// =============================== //
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// =============================== //
// API routes (need a valid session)
// =============================== //

/**
 * TODO: implement login
 */
app.use(router);

app.get(`/*`, function (req, res) {
    res.sendFile(path.join(__dirname, "../client", "index.html"));
});

app.use((_: Request, res: Response) => {
    res.send(NotFoundResponse());
});

const ERROR_TAG = "UNCAUGHT_EXCEPTION";
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    const params = JSON.stringify(req.params ?? {});
    const body = JSON.stringify(req.body ?? {});
    const trace = err.stack ?? "";
    const errData = safeJsonParse(err.message);

    // Known Error case
    if (errData?.StatusCode) {
        Log.error(errData);
        return res.send(errData);
    }

    // Uncaught exception
    Log.divider();
    Log.error(ERROR_TAG, `URI [${Log.withColor(req.path, Log.Color.Yellow)}]`);
    Log.error(ERROR_TAG, `PARAMS [${Log.withColor(params, Log.Color.Yellow)}]`);
    Log.error(ERROR_TAG, `BODY [${Log.withColor(body, Log.Color.Yellow)}]`);
    Log.error(`TRACE [\n${Log.withColor(trace, Log.Color.Yellow)}\n]`);

    Log.divider();
    res.send(
        InternalErrorResponse(
            Object.keys(errData).length > 0 ? errData : undefined
        )
    );
});
