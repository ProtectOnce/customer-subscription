import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_project_region: 'us-east-2',
  aws_appsync_graphqlEndpoint: process.env.ENDPOINT,
  aws_appsync_region: 'us-east-2',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.APIKEY,
});
