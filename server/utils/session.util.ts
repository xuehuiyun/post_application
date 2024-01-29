// /**
//  * Generates a session key
//  * NOTE: Also stores this session key into KVDB storage
//  */
// export async function generateSession(
//     { userId, email, profileImage, name, pwChangeDate }: SessionData,
//     encryptKey: string
// ): Promise<string> {
//     // generate unique session key
//     const userKey = Buffer.from(userId).toString("hex");
//     const sessionKey = userKey + "." + new Date().getTime().toString(33);

//     // encrypt data
//     const data = JSON.stringify({
//         userId,
//         email,
//         profileImage,
//         name,
//         pwChangeDate,
//         session: sessionKey
//     });
//     const session = _encryptSessionData(data, encryptKey);

//     // save session data to kvdb
//     await KVDB.saveKeyValue({
//         key: `${ADMIN_SESSION_PREFIX}${userKey}`,
//         value: JSON.stringify({
//             session,
//             lastActive: new Date().getTime()
//         })
//     });

//     return sessionKey;
// }

// // ======================= //
// // Helper functions
// // ======================= //

// function _encryptSessionData(data: string, encryptKey: string): string {
//     const iv = crypto.randomBytes(16);
//     const hash = crypto
//         .createHash("sha256")
//         .update(encryptKey, "utf8")
//         .digest("hex")
//         .substring(0, 32);
//     const cipher = crypto.createCipheriv(
//         "aes-256-cbc",
//         Buffer.from(hash, "utf8"),
//         iv
//     );

//     let encrypted = cipher.update(data);
//     encrypted = Buffer.concat([encrypted, cipher.final()]);
//     return iv.toString("hex") + "." + encrypted.toString("base64");
// }

import jwt from "jsonwebtoken";

interface SessionData {
    userId: string;
    email?: string;
    name?: string;
}

export async function generateSession(
    data: SessionData,
    secretKey: string
): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        jwt.sign(data, secretKey, { expiresIn: "1h" }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token ?? "");
            }
        });
    });
}
