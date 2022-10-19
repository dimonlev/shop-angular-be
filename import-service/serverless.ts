import type { AWS } from '@serverless/typescript';

import * as dotenv from 'dotenv';
import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

dotenv.config();
const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-1',
    stage: 'dev',

    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: '${cf:shop-angular-be-dev.QueueExpArn}',
      },
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      SQS_URL: '${cf:shop-angular-be-dev.QueueExpRef}',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    importProductsFile,
    importFileParser,
  },
};

module.exports = serverlessConfiguration;
