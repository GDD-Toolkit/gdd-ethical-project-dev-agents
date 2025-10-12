import { config } from "dotenv";
import {
  DynamoDBClient,
  ListTablesCommand,
  BatchGetItemCommand,
  QueryCommand,
  QueryCommandOutput,
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
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Policy, Project, Region } from "../../shared/types/toolkit-types";

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

/* Delete single item */
export async function deleteItem(
  tableName: string,
  key: Record<string, any>
): Promise<void> {
  try {
    const deleteCommand = new DeleteCommand({
      TableName: tableName,
      Key: key,
    });
    await sendCommand(deleteCommand);
    console.log(`Item deleted from table ${tableName}`);
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
}

/* Query items by partition key and optional filter expression */
export async function queryItems<T extends Record<string, any>>(
  tableName: string,
  keyConditionExpression: string,
  expressionAttributeValues: Record<string, any>,
  filterExpression?: string
): Promise<T[]> {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      FilterExpression: filterExpression,
    });

    const response = (await sendCommand(command)) as QueryCommandOutput;

    return (response.Items as T[]) || [];
  } catch (error) {
    console.error("Error querying items:", error);
    throw error;
  }
}

/* ========= Case Study Project Domain Functions ========= */

/* Add single project */
export const addCaseStudyProject = (project: Project) =>
  addItem(project, "Toolkit-CaseStudyProjects");

/* Get single project by id */
export const getCaseStudyProject = (id: string): Promise<Project | null> =>
  getItem<Project>({ id }, "Toolkit-CaseStudyProjects");

/* Update single project by id */
export const updateCaseStudyProject = (
  id: string,
  updateExpression: string,
  expressionValues: Record<string, any>
): Promise<UpdateCommandOutput> =>
  updateItem(
    "Toolkit-CaseStudyProjects",
    { id },
    updateExpression,
    expressionValues
  );

/* Delete single project by id */
export const deleteCaseStudyProject = (id: string): Promise<void> =>
  deleteItem("Toolkit-CaseStudyProjects", { id });

/* Query projects by region */
export const queryCaseStudyProjectsByRegion = (
  region: Region
): Promise<Project[]> =>
  queryItems<Project>(
    "Toolkit-CaseStudyProjects",
    "contains (regions, :region)",
    { ":region": region }
  );

export const queryCaseStudyProjectsByKeyword = (
  keyword: string
): Promise<Project[]> =>
  queryItems<Project>(
    "Toolkit-CaseStudyProjects",
    "contains (keywords, :keyword)",
    { ":keyword": keyword }
  );

/* Batch add projects */
export const batchAddCaseStudyProjects = (
  projects: Project[]
): Promise<BatchWriteCommandOutput | null> =>
  batchAddItem(projects, "Toolkit-CaseStudyProjects");

/* Batch get projects by id */
export const batchGetCaseStudyProjects = (
  ids: string[]
): Promise<Record<string, Project[]>> => {
  const requestItems: Record<string, { Keys: Record<string, any>[] }> = {
    "Toolkit-CaseStudyProjects": { Keys: ids.map((id) => ({ id })) },
  };
  return batchGetItem(requestItems);
};

/* ========= Policy Domain Functions ========= */

/* Add single policy */
export const addCaseStudyPolicy = (policy: Policy) =>
  addItem(policy, "Toolkit-CaseStudyPolicies");

/* Get single policy by id */
export const getCaseStudyPolicy = (id: string): Promise<Policy | null> =>
  getItem<Policy>({ id }, "Toolkit-CaseStudyPolicies");

/* Update single policy by id */
export const updateCaseStudyPolicy = (
  id: string,
  updateExpression: string,
  expressionValues: Record<string, any>
): Promise<UpdateCommandOutput> =>
  updateItem(
    "Toolkit-CaseStudyPolicies",
    { id },
    updateExpression,
    expressionValues
  );

/* Delete single policy by id */
export const deleteCaseStudyPolicy = (id: string): Promise<void> =>
  deleteItem("Toolkit-CaseStudyPolicies", { id });

/* Query policies by region */
export const queryCaseStudyPoliciesByRegion = (
  region: Region
): Promise<Policy[]> =>
  queryItems<Policy>("Toolkit-CaseStudyPolicies", "region = :region", {
    ":region": region,
  });

  export const queryCaseStudyPoliciesByKeyword = (keyword: string): Promise<Policy[]> =>
  queryItems<Policy>(
    "Toolkit-CaseStudyPolicies",
    "contains (keywords, :keyword)",
    { ":keyword": keyword }
  );

/* Batch add policies */
export const batchAddCaseStudyPolicies = (
  policies: Policy[]
): Promise<BatchWriteCommandOutput | null> =>
  batchAddItem(policies, "Toolkit-CaseStudyPolicies");

/* Batch get policies by id */
export const batchGetCaseStudyPolicies = (
  ids: string[]
): Promise<Record<string, Policy[]>> => {
  const requestItems: Record<string, { Keys: Record<string, any>[] }> = {
    "Toolkit-CaseStudyPolicies": { Keys: ids.map((id) => ({ id })) },
  };
  return batchGetItem(requestItems);
};
