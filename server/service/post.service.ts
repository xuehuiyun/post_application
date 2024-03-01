import { CONFIG } from "../conf/config";
import {
    PostGetItemResponse,
    PostGetListResponse
} from "../interface/post.interface";
import DynamoFileManager, { DynamoDBItem } from "./dynamodb.service";
import * as Log from "../utils/log.util";
import { AttributeMap } from "aws-sdk/clients/dynamodb";
import { DeleteItemReturnType } from "../interface/dynamodb.interface";

const dynamodb = new DynamoFileManager(
    CONFIG.DYNAMODB_REGION,
    CONFIG.DYNAMODB_TABLE_NAME
);

class PostService {
    async getItem(id: string): Promise<PostGetItemResponse> {
        const TAG = "OBJECT_SERVICE_GET_ITEM";
        Log.info(TAG, " Getting item from dynamoDB");
        const item = await dynamodb.getItem(id);

        if (!item) {
            throw new Error(
                JSON.stringify({
                    StatusCode: 404,
                    StatusMsg: "No such item"
                })
            );
        }
        return {
            postId: item.postId.S,
            content: item.content.S
        };
    }

    async getList(): Promise<PostGetListResponse> {
        const TAG = "OBJECT_SERVICE_GET_LIST";
        Log.info(TAG, " Getting file list from dynamoDB");
        const list = await dynamodb.getList();

        if (!list || list.length === 0) {
            throw new Error(
                JSON.stringify({
                    StatusCode: 400,
                    StatusMsg: "Error getting file list"
                })
            );
        }
        Log.info("list: ", list);

        return list;
    }

    async createItem(item: DynamoDBItem): Promise<void> {
        const TAG = "OBJECT_SERVICE_CREATE_ITEM";
        Log.info(TAG, " Create an item");
        await dynamodb.createItem(item);
    }

    async deleteItem(id: string): Promise<void> {
        const TAG = "OBJECT_SERVICE_DELETE_ITEM";
        Log.info(TAG, ` Deleting file id ${id}`);
        await dynamodb.deleteItem(id);
    }
}

export default new PostService();
