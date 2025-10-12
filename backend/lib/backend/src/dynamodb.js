"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchGetCaseStudyPolicies = exports.batchAddCaseStudyPolicies = exports.queryCaseStudyPoliciesByKeyword = exports.queryCaseStudyPoliciesByRegion = exports.deleteCaseStudyPolicy = exports.updateCaseStudyPolicy = exports.getCaseStudyPolicy = exports.addCaseStudyPolicy = exports.batchGetCaseStudyProjects = exports.batchAddCaseStudyProjects = exports.queryCaseStudyProjectsByKeyword = exports.queryCaseStudyProjectsByRegion = exports.deleteCaseStudyProject = exports.updateCaseStudyProject = exports.getCaseStudyProject = exports.addCaseStudyProject = void 0;
exports.getTables = getTables;
exports.sendCommand = sendCommand;
exports.addItem = addItem;
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.batchGetItem = batchGetItem;
exports.batchAddItem = batchAddItem;
exports.deleteItem = deleteItem;
exports.queryItems = queryItems;
const dotenv_1 = require("dotenv");
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
(0, dotenv_1.config)();
const client = new client_dynamodb_1.DynamoDBClient();
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
/* List all tables */
async function getTables() {
    var _a;
    try {
        const command = new client_dynamodb_1.ListTablesCommand({});
        const response = await client.send(command);
        console.log("Tables:");
        console.log(((_a = response.TableNames) === null || _a === void 0 ? void 0 : _a.join("\n")) || "No tables found.");
    }
    catch (error) {
        console.error("Error listing tables:", error);
    }
}
/* Generic command sender (works for any DynamoDB command) */
async function sendCommand(command) {
    try {
        const response = await docClient.send(command);
        return response;
    }
    catch (error) {
        console.error("Error sending command:", error);
        throw error;
    }
}
/* Add single item */
async function addItem(item, tableName) {
    try {
        const command = new lib_dynamodb_1.PutCommand({
            TableName: tableName,
            Item: item,
        });
        const response = await sendCommand(command);
        return response;
    }
    catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
}
/* Get single item */
async function getItem(key, tableName) {
    try {
        const command = new lib_dynamodb_1.GetCommand({
            TableName: tableName,
            Key: key,
        });
        const response = (await sendCommand(command));
        return response.Item || null;
    }
    catch (error) {
        console.error("Error getting item:", error);
        throw error;
    }
}
/* Update single item */
async function updateItem(tableName, key, updateExpression, expressionValues) {
    try {
        const command = new lib_dynamodb_1.UpdateCommand({
            TableName: tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionValues,
            ReturnValues: "ALL_NEW",
        });
        const response = await sendCommand(command);
        return response;
    }
    catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
}
/* Batch get multiple items */
async function batchGetItem(requestItems) {
    try {
        const command = new client_dynamodb_1.BatchGetItemCommand({ RequestItems: requestItems });
        const response = await client.send(command);
        return response.Responses || {};
    }
    catch (error) {
        console.error("Error in batch get items:", error);
        throw error;
    }
}
/* Batch add multiple items */
async function batchAddItem(items, tableName) {
    try {
        // DynamoDB batch write supports up to 25 items per request
        const chunks = [];
        for (let i = 0; i < items.length; i += 25) {
            chunks.push(items.slice(i, i + 25));
        }
        let lastResponse = null;
        for (const chunk of chunks) {
            const command = new lib_dynamodb_1.BatchWriteCommand({
                RequestItems: {
                    [tableName]: chunk.map((item) => ({
                        PutRequest: { Item: item },
                    })),
                },
            });
            const response = (await sendCommand(command));
            lastResponse = response;
        }
        return lastResponse;
    }
    catch (error) {
        console.error("Error in batch add items:", error);
        throw error;
    }
}
/* Delete single item */
async function deleteItem(tableName, key) {
    try {
        const deleteCommand = new lib_dynamodb_1.DeleteCommand({
            TableName: tableName,
            Key: key,
        });
        await sendCommand(deleteCommand);
        console.log(`Item deleted from table ${tableName}`);
    }
    catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
}
/* Query items by partition key and optional filter expression */
async function queryItems(tableName, keyConditionExpression, expressionAttributeValues, filterExpression) {
    try {
        const command = new client_dynamodb_1.QueryCommand({
            TableName: tableName,
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            FilterExpression: filterExpression,
        });
        const response = (await sendCommand(command));
        return response.Items || [];
    }
    catch (error) {
        console.error("Error querying items:", error);
        throw error;
    }
}
/* ========= Case Study Project Domain Functions ========= */
/* Add single project */
const addCaseStudyProject = (project) => addItem(project, "Toolkit-CaseStudyProjects");
exports.addCaseStudyProject = addCaseStudyProject;
/* Get single project by id */
const getCaseStudyProject = (id) => getItem({ id }, "Toolkit-CaseStudyProjects");
exports.getCaseStudyProject = getCaseStudyProject;
/* Update single project by id */
const updateCaseStudyProject = (id, updateExpression, expressionValues) => updateItem("Toolkit-CaseStudyProjects", { id }, updateExpression, expressionValues);
exports.updateCaseStudyProject = updateCaseStudyProject;
/* Delete single project by id */
const deleteCaseStudyProject = (id) => deleteItem("Toolkit-CaseStudyProjects", { id });
exports.deleteCaseStudyProject = deleteCaseStudyProject;
/* Query projects by region */
const queryCaseStudyProjectsByRegion = (region) => queryItems("Toolkit-CaseStudyProjects", "contains (regions, :region)", { ":region": region });
exports.queryCaseStudyProjectsByRegion = queryCaseStudyProjectsByRegion;
const queryCaseStudyProjectsByKeyword = (keyword) => queryItems("Toolkit-CaseStudyProjects", "contains (keywords, :keyword)", { ":keyword": keyword });
exports.queryCaseStudyProjectsByKeyword = queryCaseStudyProjectsByKeyword;
/* Batch add projects */
const batchAddCaseStudyProjects = (projects) => batchAddItem(projects, "Toolkit-CaseStudyProjects");
exports.batchAddCaseStudyProjects = batchAddCaseStudyProjects;
/* Batch get projects by id */
const batchGetCaseStudyProjects = (ids) => {
    const requestItems = {
        "Toolkit-CaseStudyProjects": { Keys: ids.map((id) => ({ id })) },
    };
    return batchGetItem(requestItems);
};
exports.batchGetCaseStudyProjects = batchGetCaseStudyProjects;
/* ========= Policy Domain Functions ========= */
/* Add single policy */
const addCaseStudyPolicy = (policy) => addItem(policy, "Toolkit-CaseStudyPolicies");
exports.addCaseStudyPolicy = addCaseStudyPolicy;
/* Get single policy by id */
const getCaseStudyPolicy = (id) => getItem({ id }, "Toolkit-CaseStudyPolicies");
exports.getCaseStudyPolicy = getCaseStudyPolicy;
/* Update single policy by id */
const updateCaseStudyPolicy = (id, updateExpression, expressionValues) => updateItem("Toolkit-CaseStudyPolicies", { id }, updateExpression, expressionValues);
exports.updateCaseStudyPolicy = updateCaseStudyPolicy;
/* Delete single policy by id */
const deleteCaseStudyPolicy = (id) => deleteItem("Toolkit-CaseStudyPolicies", { id });
exports.deleteCaseStudyPolicy = deleteCaseStudyPolicy;
/* Query policies by region */
const queryCaseStudyPoliciesByRegion = (region) => queryItems("Toolkit-CaseStudyPolicies", "region = :region", {
    ":region": region,
});
exports.queryCaseStudyPoliciesByRegion = queryCaseStudyPoliciesByRegion;
const queryCaseStudyPoliciesByKeyword = (keyword) => queryItems("Toolkit-CaseStudyPolicies", "contains (keywords, :keyword)", { ":keyword": keyword });
exports.queryCaseStudyPoliciesByKeyword = queryCaseStudyPoliciesByKeyword;
/* Batch add policies */
const batchAddCaseStudyPolicies = (policies) => batchAddItem(policies, "Toolkit-CaseStudyPolicies");
exports.batchAddCaseStudyPolicies = batchAddCaseStudyPolicies;
/* Batch get policies by id */
const batchGetCaseStudyPolicies = (ids) => {
    const requestItems = {
        "Toolkit-CaseStudyPolicies": { Keys: ids.map((id) => ({ id })) },
    };
    return batchGetItem(requestItems);
};
exports.batchGetCaseStudyPolicies = batchGetCaseStudyPolicies;
//# sourceMappingURL=dynamodb.js.map