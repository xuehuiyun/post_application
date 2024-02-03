import { asRouter, ExpressRouter, Get } from "../utils/routes.util";
import { Request, Response } from "express";
import * as Log from "../utils/log.util";
import { google } from "googleapis";
import { CookieNames } from "../interface/consts.interface";
import { generateSession } from "../utils/session.util";
import { SECRETS } from "../conf/config";

const TAG = "LOG_IN";

const oauth2Client = new google.auth.OAuth2(
    SECRETS.CLIENT_ID,
    SECRETS.CLIENT_SECRET,
    SECRETS.REDIRECT_URI
);

interface GoogleProfile {
    resourceName: string;
    email?: string;
    name?: string;
}

@ExpressRouter()
class Login {
    @Get("/login")
    async login(req: Request, res: Response): Promise<void> {
        Log.info(TAG, "-- Login endpoint");
        // Redirect to Google login URL
        const authUrl = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SECRETS.SCOPES
        });
        console.log("authurl: ", authUrl);
        res.redirect(authUrl);
    }

    @Get("/google/signin/callback")
    async onSignin(
        req: Request<{}, {}, {}, any>,
        res: Response
    ): Promise<void> {
        try {
            const { code } = req.query;

            const { tokens } = await oauth2Client.getToken(code as string);
            oauth2Client.setCredentials(tokens);

            const peopleApi = google.people({
                version: "v1",
                auth: oauth2Client
            });
            const peopleApiResponse = await peopleApi.people.get({
                resourceName: "people/me",
                personFields: "names,emailAddresses"
            });

            const profile: GoogleProfile =
                peopleApiResponse.data as GoogleProfile;
            const sessionCookie = await generateSession(
                {
                    userId: profile.resourceName,
                    email: profile.email,
                    name: profile.name
                },
                SECRETS.LOGIN_ENC_KEY
            );

            res.cookie(CookieNames.SSO_COOKIE, sessionCookie);

            res.setHeader("content-type", "text/html");
            res.send("<script>window.close();</script>");
        } catch (error) {
            console.error("Error during Google authentication:", error);
            res.status(500).send("Authentication failed");
        }
    }
}

export default asRouter(Login);
