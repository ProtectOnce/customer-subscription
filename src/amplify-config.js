import { Amplify } from 'aws-amplify';

Amplify.configure({
  aws_project_region: 'us-east-2',
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_ENDPOINT,
  aws_appsync_region: 'us-east-2',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.REACT_APP_APIKEY,
});
