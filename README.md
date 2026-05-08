# todo-app-aws-lambda
A serverless Todo REST API built with AWS Lambda, DynamoDB, and API Gateway supporting full CRUD operations

# AWS Lambda Todo CRUD API

A fully serverless Todo REST API built with AWS Lambda, DynamoDB, and API Gateway supporting full CRUD operations.

## Architecture

Browser → API Gateway → Lambda Functions → DynamoDB

## AWS Services Used

- **AWS Lambda** — Serverless functions for each CRUD operation
- **AWS DynamoDB** — NoSQL database to store todos
- **AWS API Gateway** — HTTP API to expose Lambda functions
- **AWS IAM** — Secure role and permissions management

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all todos |
| POST | /todos | Create a new todo |
| PUT | /todos/{id} | Mark todo as done |
| DELETE | /todos/{id} | Delete a todo |

## Project Structure

todo-app/
├── getTodos/
│   └── index.js
├── createTodo/
│   └── index.js
├── updateTodo/
│   └── index.js
└── deleteTodo/
    └── index.js

## Prerequisites
- AWS Account
- AWS CLI installed and configured
- Node.js installed

## Testing with Postman

### Create a Todo
- Method: POST
- URL: https://9sz9sz0etl.execute-api.us-east-1.amazonaws.com/prod/todos
- Body: {"text": "Buy groceries"}

### Get All Todos
- Method: GET
- URL: https://9sz9sz0etl.execute-api.us-east-1.amazonaws.com/prod/todos

### Update a Todo
- Method: PUT
- URL: https://9sz9sz0etl.execute-api.us-east-1.amazonaws.com/prod/todos/{id}

### Delete a Todo
- Method: DELETE
- URL: https://9sz9sz0etl.execute-api.us-east-1.amazonaws.com/prod/todos/{id}

## Author
Built with AWS Serverless Services

## License
MIT
