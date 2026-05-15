const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async () => {
  try {
    const result = await client.send(new ScanCommand({
      TableName: process.env.TABLE_NAME
    }));

    // Clean up the response — remove DynamoDB type format
    const items = result.Items.map(item => ({
      id: item.id.S,
      text: item.text.S,
      done: item.done.BOOL
    }));

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(items)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ 
        message: "Failed to get todos", 
        error: error.message 
      })
    };
  }
};