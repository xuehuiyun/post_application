import { CONFIG } from "../conf/config";
import { PostGetItemResponse } from "../interface/service.interface";
import DynamoFileManager, { DynamoDBItem } from "./dynamodb.service";
import * as Log from "../utils/log.util";

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

    async createItem(item: DynamoDBItem): Promise<void> {
        const TAG = "OBJECT_SERVICE_CREATE_ITEM";
        Log.info(TAG, " Create an item");
        await dynamodb.createItem(item);
    }
}

export default new PostService();
