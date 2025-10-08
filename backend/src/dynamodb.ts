import { config } from "dotenv";
import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";

config();

const client = new DynamoDBClient();

export async function getTables() {
  try {
    const command = new ListTablesCommand({});
    const response = await client.send(command);

    console.log("Tables:");
    console.log(response.TableNames?.join("\n") || "No tables found.");
  } catch (error) {
    console.error("Error listing tables:", error);
  }
}

getTables();
