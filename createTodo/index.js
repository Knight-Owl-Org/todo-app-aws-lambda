const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({});

exports.handler = async (event) => {
  try {

    // Validate input
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Request body is missing" })
      };
    }

    const { text } = JSON.parse(event.body);

    // Validate text field
    if (!text || text.trim() === "") {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Text cannot be empty" })
      };
    }

    const id = uuidv4();

    await client.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        id:   { S: id },
        text: { S: text.trim() },
        done: { BOOL: false }
      }
    }));

    // Return clean response
    return {
      statusCode: 201,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        id, 
        text: text.trim(), 
        done: false 
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        message: "Failed to create todo", 
        error: error.message 
      })
    };
  }
};