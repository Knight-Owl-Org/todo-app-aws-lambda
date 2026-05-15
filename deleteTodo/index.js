const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

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

    await client.send(new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: { S: id }
      }
    }));

    // Return clean response
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        message: "Todo deleted successfully",
        id
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        message: "Failed to delete todo", 
        error: error.message 
      })
    };
  }
};