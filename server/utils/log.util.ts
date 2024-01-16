import axios, { AxiosResponse } from "axios";
import crypto from "crypto";

/**
 * Common functions for logging in NodeJS and the Browser.
 * Logging includes timestamps, colors, prefixes, and filtering.
 */

/** Represents special unicode character for colors */
export enum Color {
    Reset = "\x1b[0m",
    Dim = "\x1b[2m",
    Red = "\x1b[31m",
    Yellow = "\x1b[33m",
    Gray = "\x1b[2m",
    Green = "\x1b[32m",
    Blue = "\x1b[34m",
    Magenta = "\x1b[35m",
    Cyan = "\x1b[36m"
}

/** Filtering level for logs */
export enum Level {
    Info = 0,
    Warning = 1,
    Error = 2,
    All = 3
}

/** A function which listens for a log message */
export type Listener = (message: string) => void;

/** Filter settings for retrieving logs */
export interface LogFilter {
    [key: string]: string | number;
    tag: string;
    startTime: string | number;
    endTime: string | number;
    start: number;
    n: number;
    server_type: string;
}

//= ================================================//

export const filterLevel: Level = Level.Info;
export const listeners: Listener[] = [console.log];
export const showTimestamp: boolean = true;
export const timestampIncludesDate: boolean =
    process.env.NODE_ENV === "production";
export const showColors: boolean = true;
export const combineRepeated: boolean = true;

let alertLevel: number = 0;
let requestId: number = 0;

const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",

    month: timestampIncludesDate ? "2-digit" : undefined,
    day: timestampIncludesDate ? "2-digit" : undefined,
    year: timestampIncludesDate ? "2-digit" : undefined,

    hour12: false
});

//= ================================================//

/** Logs an informational message to the listeners */
export function info(message: any, ...args: any[]): void {
    alertLevel = 0;
    if (filterLevel <= Level.Info) {
        const prefix = withColor("[Info]:", Color.Cyan);
        sendLog(getTimestamp(), prefix, message, ...args);
    }
}

/** Logs sensitive data that needs to be encrypted */
export function encrypt(message: any, ...args: any[]): void {
    args.forEach((arg) => {
        if (typeof arg === "object") {
            Object.keys(arg).forEach((x) => {
                arg[x] =
                    "!" +
                    crypto
                        .createHash("md5")
                        .update(arg[x], "utf8")
                        .digest("hex")
                        .substring(0, 10);
            });
        }
    });

    info(message, ...args);
}

/** Logs an error to the listeners */
export function error(message: any, ...args: any[]): void {
    alertLevel = 2;
    if (filterLevel <= Level.Error) {
        const prefix = withColor("[Error]:", Color.Red);
        sendLog(getTimestamp(), prefix, message, ...args);
    }
}

/** Logs a success message to the listeners */
export function success(message: any, ...args: any[]): void {
    alertLevel = 0;
    if (filterLevel <= Level.Info) {
        const prefix = withColor("[Success]:", Color.Green);
        sendLog(getTimestamp(), prefix, message, ...args);
    }
}

/** Logs a warning to the listeners */
export function warn(message: any, ...args: any[]): void {
    alertLevel = 1;
    if (filterLevel <= Level.Warning) {
        const prefix = withColor("[Warning]:", Color.Yellow);
        sendLog(getTimestamp(), prefix, message, ...args);
    }
}

/** Logs an ascii divider to the listeners */
export function divider(color: Color = Color.Dim): void {
    alertLevel = 0;
    if (filterLevel < Level.All) {
        sendLog(
            withColor("\n[======================================]\n", color)
        );
    }
}

//= ================================================//

/** Applies a color to the specified text */
export function withColor(text: any, color: Color): string {
    return showColors ? `${color}${text as string}\x1b[0m` : text;
}

/** Returns the current formatted time */
export function getTimestamp(): string {
    if (!showTimestamp) return "";
    return withColor(`[${timeFormatter.format(new Date())}]`, Color.Dim);
}

//= ================================================//

/** Sends the combined message to all the listeners */
function sendLog(message: string, ...args: any[]): void {
    let combinedMessage = message;
    args.forEach((arg) => {
        if (typeof arg === "object") {
            arg = JSON.stringify(arg);
        }

        combinedMessage += ` ${arg as string}`;
    });
    for (const listener of listeners) {
        listener(combinedMessage);
    }
}

//= ================================================//

/** Log server settings */
export interface ServerOptions {
    appId: string;
    serverId: string;
    serverAddress: string;
    serverType: string;
    logTag: string;
}

/**
 * Class contains more specific "logger server" code.
 */
export class Server {
    opts: ServerOptions;
    constructor(opts: ServerOptions) {
        this.opts = opts;
    }

    /**
     * Retrieves logs from the server
     *
     * @param filterOptions Filtering options
     * @returns Logs
     */
    async getLogs(filterOptions: LogFilter): Promise<AxiosResponse<any>> {
        const query = this.filterOptionsToQueryString(filterOptions);
        const url = this.opts.serverAddress + query;
        return await axios.get(url);
    }

    /**
     * Creates a log listener which send axios requests
     * to a logger server.
     *
     * @returns A `Listener` for the server
     */
    createListener(): Listener {
        const opts = this.opts;

        return function (message: string) {
            try {
                const offset = ++requestId % 1000;
                const genReqId = `${Date.now().toString(33)}${offset}`;

                void axios(`${opts.serverAddress}`, {
                    data: {
                        content: message,
                        alert_level: alertLevel,
                        tag: opts.logTag,
                        req_id: genReqId
                    },
                    headers: {
                        "Content-Type": "application/json",
                        appid: opts.appId
                    }
                });
            } catch (err) {}
        };
    }

    /** Create a http query string out of a filterOptions object */
    private filterOptionsToQueryString(filterOptions: LogFilter): string {
        const table = {
            server_type: "server_type",
            tag: "tag",
            start: "start",
            n: "count",
            startTime: "low",
            endTime: "high"
        };

        const query: string[] = [];
        for (const k in filterOptions) {
            if (table[k as keyof typeof table] != null) {
                query.push(
                    table[k as keyof typeof table] +
                        "=" +
                        encodeURIComponent(filterOptions[k])
                );
            }
        }

        let str = query.join("&");
        if (str.length > 0) {
            str = "?" + str;
        }
        return str;
    }
}
