import {
    AttributeValue,
    // GetItemCommand,
    // PutItemCommand,
    DynamoDBServiceException
} from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "aws-sdk";
import {
    CreateItemReturnType,
    DeleteItemReturnType
} from "../interface/dynamodb.interface";
import * as Log from "../utils/log.util";
import { AttributeMap } from "aws-sdk/clients/dynamodb";

export interface FileUploadData {
    filename: string;
    contentType: string;
    content: string | Buffer;
}
export interface DynamoDBItem {
    [s: string]: AttributeValue.SMember;
}

export interface ItemInterface {
    postId: string;
    author: string;
    title: string;
    content?: string;
}
export interface DynamoDBQueryParams {
    keyConditionExpression: string;
    expressionAttributeValues: { [key: string]: any };
    filterExpression?: string;
}

export interface DynamoDBManager {
    // Create operation
    createItem: (item: DynamoDBItem) => Promise<CreateItemReturnType>;

    // Read operation
    getItem: (
        primaryKey: string,
        sortKey?: string
    ) => Promise<DynamoDBItem | null>;

    // Scan operation
    getList: () => Promise<ItemInterface[]>;

    // // Update operation
    // updateItem: (
    //     primaryKey: string,
    //     sortKey: string,
    //     updatedAttributes: Partial<DynamoDBItem>
    // ) => Promise<void>;

    // Delete operation
    deleteItem: (
        primaryKey: string,
        sortKey?: string
    ) => Promise<DeleteItemReturnType>;

    // // Query operation
    // queryItems: (queryParams: DynamoDBQueryParams) => Promise<DynamoDBItem[]>;
}

class DynamoFileManager implements DynamoDBManager {
    private readonly dynamoDBClient: DynamoDB;
    private readonly tableName: string;

    constructor(region: string, tableName: string) {
        const config: DynamoDB.ClientConfiguration = {
            region,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRETE_KEY
        };
        this.dynamoDBClient = new DynamoDB(config);
        this.tableName = tableName;
    }

    async createItem(item: DynamoDBItem): Promise<CreateItemReturnType> {
        const TAG = "DYNAMODB_CREATE_ITEM";
        Log.info(TAG, "----", item, this.tableName);

        try {
            const result = await this.dynamoDBClient
                .putItem({
                    Item: item,
                    TableName: this.tableName
                })
                .promise();
            Log.info("test result: ", result);
            return {
                status: result.$response.httpResponse.statusCode
            };
        } catch (err) {
            Log.error("DynamoDB createItem error: ", err);

            if (err instanceof DynamoDBServiceException) {
                throw new Error(
                    JSON.stringify({
                        StatusCode: err.$metadata.httpStatusCode,
                        StatusMsg: err.name,
                        Data: err.message
                    })
                );
            } else {
                throw new Error("Unknown Error");
            }
        }
    }

    async getItem(
        primaryKey: string,
        sortKey?: string
    ): Promise<DynamoDBItem | null> {
        const TAG = "DYNAMODB_GET_ITEM";
        const key: Record<string, AttributeValue> = {
            postId: { S: primaryKey },
            ...(sortKey && { sortKey: { S: sortKey } })
        };

        Log.info(TAG, "----", key);
        try {
            const result = await this.dynamoDBClient
                .getItem({
                    TableName: this.tableName,
                    Key: key
                })
                .promise();
            return result.Item as DynamoDBItem | null;
        } catch (err) {
            if (err instanceof DynamoDBServiceException) {
                Log.error("DynamoDB getItem error: ", err);
                throw new Error(
                    JSON.stringify({
                        StatusCode: err.$metadata.httpStatusCode,
                        StatusMsg: err.name,
                        Data: err.message
                    })
                );
            } else {
                throw new Error("Unknown Error");
            }
        }
    }

    async deleteItem(
        primaryKey: string,
        sortKey?: string | undefined
    ): Promise<DeleteItemReturnType> {
        const TAG = "DYNAMODB_DELETE_ITEM";
        const key: Record<string, AttributeValue> = {
            postId: { S: primaryKey },
            ...(sortKey && { sortKey: { S: sortKey } })
        };

        Log.info(TAG, "----", key);
        try {
            const result = await this.dynamoDBClient
                .deleteItem({
                    TableName: this.tableName,
                    Key: key
                })
                .promise();
            return {
                status: result.$response.httpResponse.statusCode
            };
        } catch (err) {
            if (err instanceof DynamoDBServiceException) {
                Log.error("DynamoDB getItem error: ", err);
                throw new Error(
                    JSON.stringify({
                        StatusCode: err.$metadata.httpStatusCode,
                        StatusMsg: err.name,
                        Data: err.message
                    })
                );
            } else {
                throw new Error("Unknown Error");
            }
        }
    }

    async getList(): Promise<ItemInterface[]> {
        const TAG = "DYNAMODB_GET_LIST";
        Log.info(TAG);
        try {
            const result = await this.dynamoDBClient
                .scan({
                    TableName: this.tableName
                })
                .promise();
            Log.info("result: ", result);
            const items: ItemInterface[] =
                result.Items?.map((item: AttributeMap) => {
                    return {
                        postId: item.postId.S ?? "",
                        author: item.author.S ?? "",
                        title: item.title.S ?? "",
                        content: item.content.S ?? ""
                    };
                }) || [];
            return items;
        } catch (err) {
            if (err instanceof DynamoDBServiceException) {
                Log.error("DynamoDB getList error: ", err);
                throw new Error(
                    JSON.stringify({
                        StatusCode: err.$metadata.httpStatusCode,
                        StatusMsg: err.name,
                        Data: err.message
                    })
                );
            } else {
                throw new Error("Unknown Error");
            }
        }
    }
}

export default DynamoFileManager;
