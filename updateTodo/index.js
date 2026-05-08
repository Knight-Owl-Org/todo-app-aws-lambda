const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  await client.send(new UpdateItemCommand({
    TableName: "Todos",
    Key: {
      id: { S: id }
    },
    UpdateExpression: "SET done = :done",
    ExpressionAttributeValues: {
      ":done": { BOOL: true }
    },
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Todo marked as done" }),
  };
};