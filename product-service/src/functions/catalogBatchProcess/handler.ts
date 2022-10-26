import { postProductPG } from '@functions/postProductPG/handler';
import { Product } from '@functions/ProductType';
import { middyfy } from '@libs/lambda';
import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const { TOPIC_ARN } = process.env;

export const catalogBatchProcess = async (event: SQSEvent) => {
  console.log('SQSEvent event: ', event);

  const sns = new SNS({ region: 'eu-west-1' });

  const getMessageParams = (product: Omit<Product, 'id'>) => {
    return {
      Subject: 'Hello description',
      Message: JSON.stringify(product),
      TopicArn: TOPIC_ARN,
      MessageAttributes: {
        event: {
          DataType: 'String',
          StringValue: 'description',
        },
        description: {
          DataType: 'String',
          StringValue: JSON.parse(JSON.stringify(product)).description,
        },
      },
    };
  };

  for (let record of event.Records) {
    console.log('record: ', record);

    const { count, price, title, description, cover } = JSON.parse(record.body);
    console.log('record.body: ', record.body);
    console.log('JSON.parse(record.body): ', JSON.parse(record.body));
    const body: Omit<Product, 'id'> = {
      count,
      price,
      title,
      description,
      cover,
    };
    console.log('body: ', body);
    await postProductPG(body);
    const messageParams = getMessageParams(body);
    await sns.publish(messageParams).promise();
  }
};
export const main = middyfy(catalogBatchProcess);
