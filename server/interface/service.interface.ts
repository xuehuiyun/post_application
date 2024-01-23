import { z } from "zod";

/**
 * get item
 */
export const PostGetItemQuerySchema = z.object({
    primaryKey: z.string()
});

export type PostGetItemQuery = z.infer<typeof PostGetItemQuerySchema>;

export const PostGetItemResponseSchema = z.object({
    postId: z.string(),
    content: z.string()
});

export type PostGetItemResponse = z.infer<typeof PostGetItemResponseSchema>;

/**
 * create item
 */
export const PostCreateItemBodySchema = z.object({
    postId: z.string(),
    content: z.string().optional()
});

export type PostCreateItemBody = z.infer<typeof PostCreateItemBodySchema>;
