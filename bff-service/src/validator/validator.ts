import Joi from 'joi';
import {
  ValidatedRequestSchema,
  createValidator,
  ContainerTypes,
} from 'express-joi-validation';

const validator = createValidator();
const loginRegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

const querySchema = Joi.object({
  login: Joi.string()
    .required()
    .pattern(loginRegExp, '"at least 1 letter and 1 number"'),
  password: Joi.string()
    .required()
    .pattern(loginRegExp, '"at least 1 letter and 1 number"'),
  age: Joi.number().integer().min(4).max(130).required(),
  isdeleted: Joi.boolean().required().default(false),
});

export interface RequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    name: string;
    password: string;
    age: number;
    isdeleted: boolean;
  };
}
const validatorRequest = validator.body(querySchema);

export { validatorRequest };
