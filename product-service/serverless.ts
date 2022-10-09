import type { AWS } from '@serverless/typescript';

import getProductsList from 'src/product-service/getProductsList';
import getProductsById from 'src/product-service/getProductsById';
import getProductsByIdPG from 'src/product-service/getProductsByIdPG';
import getProductsListPG from 'src/product-service/getProductsListPG';
import postProductPG from 'src/product-service/postProductPG';
import * as dotenv from 'dotenv';

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
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    getProductsList,
    getProductsById,
    getProductsListPG,
    getProductsByIdPG,
    postProductPG,
  },
};

module.exports = serverlessConfiguration;
