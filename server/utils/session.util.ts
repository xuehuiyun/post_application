import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { CookieNames } from "../interface/consts.interface";
import { SECRETS } from "../conf/config";

interface SessionData {
    userId: string;
    email: string;
    photoUrl: string;
    name?: string;
}

interface AuthenticatedRequest extends Request {
    user?: any;
}

export async function generateSession(
    data: SessionData,
    secretKey: string
): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        jwt.sign(data, secretKey, { expiresIn: "2h" }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token ?? "");
            }
        });
    });
}

export function verifySession(token: string, secretKey: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                reject(error);
            } else {
                resolve(decoded);
            }
        });
    });
}
