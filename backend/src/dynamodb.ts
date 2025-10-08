import { config } from "dotenv";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandOutput} from "@aws-sdk/lib-dynamodb";

config();

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

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

export async function sendCommand(command) {
  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    console.error("Error sending command:", error);
    throw error;
  }
}

export async function addItem<T extends Record<string, any>>(item: T, tableName: string): Promise<PutCommandOutput> {
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