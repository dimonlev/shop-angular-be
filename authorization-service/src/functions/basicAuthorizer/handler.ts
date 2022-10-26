import 'source-map-support/register';
import * as dotenv from 'dotenv';
import { middyfy } from '@libs/lambda';
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
dotenv.config();

const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent,
  ctx,
  callback
) => {
  console.log('event: ', event);
  console.log('authToken: ', event.authorizationToken);
  console.log(`event['type']: `, event['type']);
  if (event['type'] !== 'TOKEN') callback('Unauthorized');
  try {
    const authorizationToken = event.authorizationToken;
    console.log('authorizationToken: ', authorizationToken);
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const [userName, password] = plainCreds;

    const storedUserPassword = process.env[userName];
    const effect =
      !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    callback(null, policy);
  } catch (error) {
    callback('Unauthorized: ', error.message);
  }
};

const generatePolicy = (
  principalId: string,
  resource: string,
  effect = 'Allow'
) => ({
  principalId: principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource,
      },
    ],
  },
});

export const main = middyfy(basicAuthorizer);
