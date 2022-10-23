import {
  APIGatewayAuthorizerCallback,
  APIGatewayTokenAuthorizerEvent,
} from 'aws-lambda';
import 'source-map-support/register';
import * as dotenv from 'dotenv';
dotenv.config();

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

export const basicAuthorizer = async (
  event: APIGatewayTokenAuthorizerEvent,
  _context,
  callback: APIGatewayAuthorizerCallback
) => {
  if (event['type'] !== 'TOKEN') callback('Unauthorized');
  try {
    const authToken = event.authorizationToken;
    const encodedCreds = authToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCredsv = buff.toString('utf-8').split(':');
    const [userName, userPass] = plainCredsv;

    if (!userPass || !userPass) callback('Unauthorized');

    const storedUserPass = process.env[userName];
    const effect =
      !storedUserPass || storedUserPass !== userPass ? 'Deny' : 'Allow';
    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    callback(null, policy);
  } catch (error) {
    callback('Unauthorized: ', error.message);
  }
};
