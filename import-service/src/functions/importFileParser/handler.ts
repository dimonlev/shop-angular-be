import * as dotenv from 'dotenv';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { formatJSONResponse } from '@libs/apiGateway';
import * as csv from 'csv-parser';
import { S3Event } from 'aws-lambda';

dotenv.config();

const s3 = new AWS.S3({ region: 'eu-west-1' });
const BUCKET = 'import-service-angular-be';
const importFileParser = async (event: S3Event) => {
  try {
    const results = [];

    for (const record of event.Records) {
      console.log(record);
      const fileName = record.s3.object.key;
      const params = { Bucket: BUCKET, Key: fileName };
      const movedFileOptions = {
        Bucket: BUCKET,
        CopySource: BUCKET + '/' + fileName,
        Key: fileName.replace('uploaded', 'parsed'),
      };

      await new Promise<void>((resolve) => {
        s3.getObject(params)
          .createReadStream()
          .pipe(
            csv({
              separator: ';',
              headers: ['Title', 'Description', 'Price', 'Count', 'Cover'],
            })
          )
          .on('data', (data) => results.push(data))
          .on('end', () => {
            console.log(results);
            resolve();
          });
      });

      await s3.copyObject(movedFileOptions).promise();
      await s3.deleteObject(params).promise();
    }
    return formatJSONResponse(results, 200);
  } catch (err) {
    return formatJSONResponse(err?.message, 500);
  }
};

export const main = middyfy(importFileParser);
