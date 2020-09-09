This project is on serverless web application hosted on AWS. 
Client application frontend is built on React,Nodejs.
Server backend application has python and GraphQL implemntations.

Steps to run the project:<br />
1.Clone the project to local system.<br />
2.Navigate to server folder and install serverless framework (npm install serverless).<br />
3.Configure AWS secrets in env folder.<br />
4.Run sls deploy in cmd to deploy serverless application.<br />
5.Once deployed copy the endpoints and configure in client config.js<br />
6.Navigate to AWS Cognito console and copy the pool,client ids.<br />
7.Configure above ids in client config.js<br />
8.Run npm run dev-server to start the application<br />

Application run on port 8080 by default.

## Setup

```bash
npm install -g serverless
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```
The expected result should be similar to:

## Scaling

### AWS AppSync

AWS AppSync simplifies application development by letting you create a flexible API to securely access, manipulate, and combine data from one or more data sources. AppSync is a managed service that uses GraphQL to make it easy for applications to get exactly the data they need. [link](https://aws.amazon.com/appsync/)

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```


<!--
title: 'React APP Using AWS Appsync & Apolo client'
description: 'This example demonstrates how to use a GraphQL Endpoints in React APP.
framework: v1
language: React JS
-->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run dev-server`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
