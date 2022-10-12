import type { AWS } from '@serverless/typescript';

import * as dotenv from 'dotenv';
import importProductsFile from '@functions/importProductsFile';
import importFileParser from '@functions/importFileParser';

dotenv.config();
const bucket = process.env.BUCKET;
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
        Action: ['s3:ListBucket'],
        Resource: [`arn:aws:s3:::${bucket}`],
      },
      {
        Effect: 'Allow',
        Action: ['s3:*'],
        Resource: [`arn:aws:s3:::${bucket}/*`],
      },
    ],

    lambdaHashingVersion: '20201221',
  },
  functions: {
    importProductsFile,
    importFileParser,
  },
};

module.exports = serverlessConfiguration;
