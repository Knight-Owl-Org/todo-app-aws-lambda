const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async (event) => {
  try {

    // Validate path parameter
    if (!event.pathParameters || !event.pathParameters.id) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Todo ID is missing" })
      };
    }

    const { id } = event.pathParameters;

    // Validate request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Request body is missing" })
      };
    }

    const { done } = JSON.parse(event.body);

    // Validate done field
    if (typeof done !== "boolean") {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Done must be true or false" })
      };
    }

    await client.send(new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: id }
      },
      UpdateExpression: "SET done = :done",
      ExpressionAttributeValues: {
        ":done": { BOOL: done }
      }
    }));

    // Return clean response
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        message: "Todo updated successfully",
        id,
        done
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        message: "Failed to update todo", 
        error: error.message 
      })
    };
  }
};