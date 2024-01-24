import { asRouter, ExpressRouter, Get } from "../utils/routes.util";
import { NextFunction, Request, Response } from "express";
import * as Log from "../utils/log.util";
import { google, Auth } from "googleapis";
import { CookieNames } from "../interface/consts.interface";
import { generateSession } from "../utils/session.util";

const TAG = "LOG_IN";

/**
 * credentials below subject to be moved to secrete
 */
const SCOPES = ["https://www.googleapis.com/auth/userinfo.profile"];
const CLIENT_ID =
    "345400565297-dph74jf28sm6u9rvovmsgd17c6sj7a44.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:9099/google/signin/callback";

const LOGIN_ENC_KEY = "V1RJeFIyUldjRWhQV0ZKclRXcHNOVmRyYUU5Tk1rWlpWVzA1YTFJeWF";

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
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
            scope: SCOPES
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
            Log.info("req: ", req.query);
            const { code } = req.query;

            // Exchange authorization code for tokens
            const { tokens } = await oauth2Client.getToken(code as string);
            oauth2Client.setCredentials(tokens);

            Log.info("token: ", tokens);
            // Example: Get user profile using Google People API
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
            Log.info("profile: ", profile);
            // Generate a session cookie (using JWT or your preferred method)
            const sessionCookie = await generateSession(
                {
                    userId: profile.resourceName,
                    email: profile.email,
                    name: profile.name
                },
                LOGIN_ENC_KEY
            );
            Log.info("cookie: ", sessionCookie);

            // Set the session cookie in the response
            res.cookie(CookieNames.SSO_COOKIE, sessionCookie);

            // Close the window using a script
            res.setHeader("content-type", "text/html");
            res.send("<script>window.close();</script>");
        } catch (error) {
            console.error("Error during Google authentication:", error);
            res.status(500).send("Authentication failed");
        }
    }
}

export default asRouter(Login);
