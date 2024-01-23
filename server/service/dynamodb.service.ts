import {
    AttributeValue,
    // GetItemCommand,
    // PutItemCommand,
    DynamoDBServiceException
} from "@aws-sdk/client-dynamodb";
import { DynamoDB } from "aws-sdk";
import { CreateItemReturnType } from "../interface/dynamodb.interface";
import * as Log from "../utils/log.util";

export interface FileUploadData {
    filename: string;
    contentType: string;
    content: string | Buffer;
}
export interface DynamoDBItem {
    [s: string]: AttributeValue.SMember;
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

    // // Update operation
    // updateItem: (
    //     primaryKey: string,
    //     sortKey: string,
    //     updatedAttributes: Partial<DynamoDBItem>
    // ) => Promise<void>;

    // // Delete operation
    // deleteItem: (primaryKey: string, sortKey?: string) => Promise<void>;

    // // Query operation
    // queryItems: (queryParams: DynamoDBQueryParams) => Promise<DynamoDBItem[]>;

    // // Scan operation
    // scanItems: () => Promise<DynamoDBItem[]>;
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
        Log.info("here: ", process.env.AWS_ACCESS_KEY);

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
            postId: { S: primaryKey }, // Assuming 'S' for string type, adjust accordingly
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

        // return result.Item as DynamoDBItem | null;
    }

    // async updateItem(primaryKey: string, sortKey: string, updatedAttributes: Partial<DynamoDBItem>): Promise<void> {
    //     const key = { primaryKey, sortKey };

    //     const updateExpression = 'SET ' + Object.keys(updatedAttributes)
    //       .map(attr => `#${attr} = :${attr}`)
    //       .join(', ');

    //     const expressionAttributeValues = Object.entries(updatedAttributes)
    //       .reduce((acc, [key, value]) => ({ ...acc, [`:${key}`]: value }), {});

    //     const expressionAttributeNames = Object.keys(updatedAttributes)
    //       .reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});

    //     await this.dynamoDBClient.send(new UpdateItemCommand({
    //       TableName: 'YourTableName',
    //       Key: key,
    //       UpdateExpression: updateExpression,
    //       ExpressionAttributeValues: expressionAttributeValues,
    //       ExpressionAttributeNames: expressionAttributeNames,
    //     }));
    //   }
}

export default DynamoFileManager;
