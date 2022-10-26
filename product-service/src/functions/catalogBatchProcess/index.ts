// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import * as dotenv from 'dotenv';
dotenv.config();
const { SQS_ARN } = process.env;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: SQS_ARN,
      },
    },
  ],
};
