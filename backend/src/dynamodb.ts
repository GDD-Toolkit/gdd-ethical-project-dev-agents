import { config } from "dotenv";
import {
  DynamoDBClient,
  ListTablesCommand,
  BatchGetItemCommand,
} from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  BatchWriteCommand,
  PutCommandOutput,
  GetCommandOutput,
  UpdateCommandOutput,
  BatchWriteCommandOutput,
} from "@aws-sdk/lib-dynamodb";

config();

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

/* List all tables */
export async function getTables(): Promise<void> {
  try {
    const command = new ListTablesCommand({});
    const response = await client.send(command);

    console.log("Tables:");
    console.log(response.TableNames?.join("\n") || "No tables found.");
  } catch (error) {
    console.error("Error listing tables:", error);
  }
}

/* Generic command sender (works for any DynamoDB command) */
export async function sendCommand(command: any) {
  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    console.error("Error sending command:", error);
    throw error;
  }
}

/* Add single item */
export async function addItem<T extends Record<string, any>>(
  item: T,
  tableName: string
): Promise<PutCommandOutput> {
  try {
    const command = new PutCommand({
      TableName: tableName,
      Item: item,
    });
    const response = await sendCommand(command);
    return response as PutCommandOutput;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

/* Get single item */
export async function getItem<T extends Record<string, any>>(
  key: Record<string, any>,
  tableName: string
): Promise<T | null> {
  try {
    const command = new GetCommand({
      TableName: tableName,
      Key: key,
    });
    const response = (await sendCommand(command)) as GetCommandOutput;
    return (response.Item as T) || null;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
}

/* Update single item */
export async function updateItem(
  tableName: string,
  key: Record<string, any>,
  updateExpression: string,
  expressionValues: Record<string, any>
): Promise<UpdateCommandOutput> {
  try {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionValues,
      ReturnValues: "ALL_NEW",
    });
    const response = await sendCommand(command);
    return response as UpdateCommandOutput;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}

/* Batch get multiple items */
export async function batchGetItem(
  requestItems: Record<string, { Keys: Record<string, any>[] }>
): Promise<Record<string, any[]>> {
  try {
    const command = new BatchGetItemCommand({ RequestItems: requestItems });
    const response = await client.send(command);
    return response.Responses || {};
  } catch (error) {
    console.error("Error in batch get items:", error);
    throw error;
  }
}

/* Batch add multiple items */
export async function batchAddItem(
  items: Record<string, any>[],
  tableName: string
): Promise<BatchWriteCommandOutput | null> {
  try {
    // DynamoDB batch write supports up to 25 items per request
    const chunks: Record<string, any>[][] = [];
    for (let i = 0; i < items.length; i += 25) {
      chunks.push(items.slice(i, i + 25));
    }

    let lastResponse: BatchWriteCommandOutput | null = null;
    for (const chunk of chunks) {
      const command = new BatchWriteCommand({
        RequestItems: {
          [tableName]: chunk.map((item) => ({
            PutRequest: { Item: item },
          })),
        },
      });

      const response = (await sendCommand(command)) as BatchWriteCommandOutput;
      lastResponse = response;
    }

    return lastResponse;
  } catch (error) {
    console.error("Error in batch add items:", error);
    throw error;
  }
}

/* Example test */
getTables();
