// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import * as dotenv from 'dotenv';
dotenv.config();

const bucket = process.env.BUCKET;

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: bucket,
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
          },
        ],
        existing: true,
      },
    },
  ],
};
