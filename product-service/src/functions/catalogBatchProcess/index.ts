// import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      event: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              'Fn::GetAtt': ['catalogItemsQueue', 'Arn'],
            },
          },
        },
      ],
    },
  ],
};
