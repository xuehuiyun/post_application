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
    author: z.string(),
    title: z.string(),
    lastModified: z.string(),
    content: z.string().optional()
});

export type PostCreateItemBody = z.infer<typeof PostCreateItemBodySchema>;

export const PostCreateItemResponseSchema = z.undefined();

export type PostCreateItemResponse = z.infer<
    typeof PostCreateItemResponseSchema
>;

/**
 * get file list
 */
export const PostGetListQuerySchema = z.undefined();

export type PostGetListQuery = z.infer<typeof PostGetListQuerySchema>;

export const PostGetListResponseSchema = z.array(
    z.object({
        postId: z.string(),
        author: z.string(),
        title: z.string(),
        lastModified: z.string().optional(),
        content: z.string().optional()
    })
);
export type PostGetListResponse = z.infer<typeof PostGetListResponseSchema>;

/**
 * delete item
 */
export const PostDeleteItemQuerySchema = z.object({
    primaryKey: z.string()
});

export type PostDeleteItemQuery = z.infer<typeof PostDeleteItemQuerySchema>;

export const PostDeleteItemResponseSchema = z.undefined();

export type PostDeleteItemResponse = z.infer<
    typeof PostDeleteItemResponseSchema
>;
