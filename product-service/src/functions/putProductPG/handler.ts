import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { updateProduct } from '@services/updateProduct';
import { Product } from '@functions/ProductType';

export const putProduct = async (event: APIGatewayProxyEvent) => {
  console.log(event.body, 'body');
  const { body } = event;
  const product = JSON.parse(body);
  const { title, description, price, count, cover }: Product = product;
  const value = {
    title: title,
    description: description,
    price: +price,
    count: +count,
    cover: cover,
  };
  const id = event.pathParameters.productId;

  try {
    const rows = await updateProduct(value, id);
    return formatJSONResponse(JSON.stringify(rows), 200);
  } catch (error) {
    return formatJSONResponse(JSON.stringify(error), 500);
  }
};

export const main = middyfy(putProduct);
