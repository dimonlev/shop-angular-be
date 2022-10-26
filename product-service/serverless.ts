import type { AWS } from '@serverless/typescript';
import * as dotenv from 'dotenv';
import getProductsByIdPG from '@functions/getProductsByIdPG';
import getProductsListPG from '@functions/getProductsListPG';
import postProductPG from '@functions/postProductPG';
import catalogBatchProcess from '@functions/catalogBatchProcess';
import putProductPG from '@functions/putProductPG';
import deleteProductPG from '@functions/deleteProductPG';

dotenv.config();

const {
  PG_HOST,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
  QUEUE_NAME,
  TOPIC_NAME,
  SQS_ARN,
  TOPIC_ARN,
} = process.env;

const serverlessConfiguration: AWS = {
  service: 'shop-angular-be',
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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST: PG_HOST,
      PG_PORT: '5432',
      PG_DATABASE: PG_DATABASE,
      PG_USERNAME: PG_USERNAME,
      PG_PASSWORD: PG_PASSWORD,
      SNS_ARN: {
        Ref: 'SNSTopic',
      },
      QUEUE_NAME,
      TOPIC_NAME,
      SQS_ARN,
      TOPIC_ARN,
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: {
          Ref: 'SNSTopic',
        },
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: TOPIC_NAME,
        },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'sqs_aws1@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          },
        },
      },
    },
  },
  functions: {
    getProductsListPG,
    getProductsByIdPG,
    postProductPG,
    catalogBatchProcess,
    putProductPG,
    deleteProductPG,
  },
};

module.exports = serverlessConfiguration;
