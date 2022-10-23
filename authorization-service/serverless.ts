import type { AWS } from '@serverless/typescript';

import basicAuthorizer from '@functions/basicAuthorizer';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-dotenv-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Outputs: {
      AuthArn: {
        Description: 'Auth Arn',
        Value: {
          'Fn::GetAtt': ['BasicAuthorizerLambdaFunction', 'Arn'],
        },
        Export: {
          Name: 'AuthArn',
        },
      },
    },
  },
  // import the function via paths
  functions: { basicAuthorizer },
};

module.exports = serverlessConfiguration;
