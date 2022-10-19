import type { AWS } from '@serverless/typescript';

import getProductsList from '@functions/getProductsList';
import getProductsById from '@functions/getProductsById';
import getProductsByIdPG from '@functions/getProductsByIdPG';
import getProductsListPG from '@functions/getProductsListPG';
import postProductPG from '@functions/postProductPG';
import * as dotenv from 'dotenv';
import catalogBatchProcess from '@functions/catalogBatchProcess';

dotenv.config();

const { PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

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
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sns:*'],
        Resource: {
          Ref: 'SNSTopic',
        },
      },
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: [
          {
            'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
          },
        ],
      },
    ],
    lambdaHashingVersion: '20201221',
  },
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'product-service-catalogItemsQueue',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'product-service-sqs-sns-topic',
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
      SNSSubscriptionFilteredBydescription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'sqs_aws2@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'SNSTopic',
          },
          FilterPolicy: {
            description: [{ prefix: 'Project2' }],
          },
        },
      },
    },
    Outputs: {
      QueueExpRef: {
        Description: 'Export ref SQS',
        Value: {
          Ref: 'catalogItemsQueue',
        },
        Export: {
          Name: {
            'Fn::Sub': '${AWS::StackName}-QueueExpRef',
          },
        },
      },
      QueueExpArn: {
        Description: 'Export ref SQS',
        Value: {
          'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
        },
        Export: {
          Name: {
            'Fn::Sub': '${AWS::StackName}-QueueExpArn',
          },
        },
      },
    },
  },
  functions: {
    getProductsList,
    getProductsById,
    getProductsListPG,
    getProductsByIdPG,
    postProductPG,
    catalogBatchProcess,
  },
};

module.exports = serverlessConfiguration;
