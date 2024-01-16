import express from "express";
import { CONFIG } from "./conf/config";
import * as Log from "./utils/log.util";

const app = express();

app.get("/hc", (req: express.Request, res: express.Response) => {
    console.log("checking");
    res.end("OK");
});

app.listen(CONFIG.PORT, () => {
    Log.info(`Server start up, running on port: ${CONFIG.PORT}`);
});
