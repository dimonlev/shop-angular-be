import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { delProduct } from '@services/delProduct';

export const deleteProduct = async (event: APIGatewayProxyEvent) => {
  console.log(event, 'event');
  const id = event.pathParameters.productId;

  try {
    const result = await delProduct(id);
    return formatJSONResponse(JSON.stringify(result), 200);
  } catch (error) {
    return formatJSONResponse(JSON.stringify(`Server ${error}`), 500);
  }
};

export const main = middyfy(deleteProduct);
