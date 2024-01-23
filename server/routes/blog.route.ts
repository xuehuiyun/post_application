import {
    PostCreateItemBody,
    PostGetItemQuery,
    PostGetItemResponse
} from "../interface/service.interface";
import { ResponseData, SuccessResponse } from "../utils/response.util";
import { ExpressRouter, Get, asRouter, Put } from "../utils/routes.util";
import { Request, Response } from "express";
import * as Log from "../utils/log.util";
import PostService from "../service/post.service";

@ExpressRouter("/blog")
class Blog {
    /**
     * Get a single Post
     */
    @Get("/get")
    async getSinglePost(
        req: Request<{}, {}, {}, PostGetItemQuery>,
        res: Response<ResponseData<PostGetItemResponse>>
    ): Promise<void> {
        const TAG = "POST_GET_ITEM";
        Log.info(TAG, "---", req.query.primaryKey);

        const data = await PostService.getItem(req.query.primaryKey);
        res.send(SuccessResponse<PostGetItemResponse>(data));
    }

    @Put("/create")
    async createSinglePost(
        req: Request<{}, {}, PostCreateItemBody, {}>,
        res: Response
    ): Promise<void> {
        const TAG = "POST_CREATE_ITEM";
        Log.info(TAG, "---", req.body);

        await PostService.createItem({
            postId: { S: req.body.postId },
            content: { S: req.body.content ? req.body.content : "" }
        });
        res.send(SuccessResponse());
    }
}

export default asRouter(Blog);
