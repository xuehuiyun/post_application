import { ResponseData, SuccessResponse } from "../utils/response.util";
import { ExpressRouter, Get, asRouter, Put } from "../utils/routes.util";
import { Request, Response } from "express";
import * as Log from "../utils/log.util";
import { GetUserProfileResponse } from "../interface/user.interface";
import { CookieNames } from "../interface/consts.interface";
import { verifySession } from "../utils/session.util";
import { SECRETS } from "../conf/config";
@ExpressRouter("/user")
class User {
    @Get("/profile")
    async getProfile(
        req: Request<{}, {}, {}, any>,
        res: Response<ResponseData<GetUserProfileResponse>>
    ): Promise<void> {
        const sessionCookie = req.cookies[CookieNames.SSO_COOKIE];

        const decoded = await verifySession(
            sessionCookie,
            SECRETS.LOGIN_ENC_KEY
        );
        Log.info("decoded: ", decoded);
        res.send(
            SuccessResponse<GetUserProfileResponse>({
                name: decoded.name,
                expDate: new Date(decoded.exp * 1000).toISOString(),
                email: decoded.email,
                photo: decoded.photoUrl
            })
        );
    }
}

export default asRouter(User);
