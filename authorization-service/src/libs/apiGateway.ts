import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import { headers, IRequest, IResponse } from './typesLibs';

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const apiResponses = {
  _200: (reqiest: IRequest, status: number): IResponse => {
    return {
      statusCode: status,
      headers,
      body: JSON.stringify(reqiest),
    };
  },
  _400: (reqiest: IRequest, status: number): IResponse => {
    return {
      statusCode: status,
      headers,
      body: JSON.stringify({ message: reqiest.message }),
    };
  },
};

export const formatJSONResponse = (
  response: Record<string, unknown>,
  status: number
) => {
  return apiResponses['_' + status](response, status);
};
