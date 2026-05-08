const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient({});

exports.handler = async (event) => {
  const { text } = JSON.parse(event.body);

  const item = {
    id:   { S: uuidv4() },
    text: { S: text },
    done: { BOOL: false },
  };

  await client.send(new PutItemCommand({
    TableName: "Todos",
    Item: item
  }));

  return {
    statusCode: 201,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(item),
  };
};