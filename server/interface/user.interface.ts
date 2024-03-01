import { z } from "zod";

/**
 * response from get profile
 */
export const GetUserProfileResponseSchema = z.object({
    email: z.string(),
    name: z.string(),
    expDate: z.string(),
    photo: z.string()
});

export type GetUserProfileResponse = z.infer<
    typeof GetUserProfileResponseSchema
>;
