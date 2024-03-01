import { z } from "zod";

/**
 * return type of createItem
 */
export const CreateItemReturnSchema = z.object({
    status: z.union([z.number(), z.undefined()])
});

export type CreateItemReturnType = z.infer<typeof CreateItemReturnSchema>;

/**
 * return type of deleteItem
 */
export const DeleteItemReturnSchema = z.object({
    status: z.union([z.number(), z.undefined()])
});
export type DeleteItemReturnType = z.infer<typeof DeleteItemReturnSchema>;

/**
 * return typr of getItem
 */
export const GetItemReturnSchema = CreateItemReturnSchema.extend({});

export type GetItemReturnType = z.infer<typeof GetItemReturnSchema>;
