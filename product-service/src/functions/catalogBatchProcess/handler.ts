import { postProductPG } from '@functions/postProductPG/handler';
import { middyfy } from '@libs/lambda';
import { SNS } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

export const catalogBatchProcess = async (event) => {
  console.log('catalogBatchProcess ', event);

  const sns = new SNS({ region: 'eu-west-1' });

  const getMessageParams = (product) => {
    return {
      Subject: 'Hello description',
      Message: JSON.stringify(product),
      TopicArn: process.env.SNS_ARN,
      MessageAttributes: {
        event: {
          DataType: 'String',
          StringValue: 'description',
        },
        description: {
          DataType: 'String',
          StringValue: JSON.parse(product.replace(/^\uFEFF/gi, '')).description,
        },
      },
    };
  };

  for (let record of event.Records) {
    const { body } = record;
    await postProductPG(body);
    const messageParams = getMessageParams(body);
    await sns.publish(messageParams).promise();
  }
};
export const main = middyfy(catalogBatchProcess);
