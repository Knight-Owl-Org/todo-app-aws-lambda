const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({});

exports.handler = async (event) => {
  const { id } = event.pathParameters;

  await client.send(new DeleteItemCommand({
    TableName: "Todos",
    Key: {
      id: { S: id }
    },
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Todo deleted successfully" }),
  };
};