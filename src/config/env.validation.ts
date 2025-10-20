import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  DB_DIALECT: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),

  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.string().required(),

  conn_string: Joi.string().required(), 

  JWT_SECRET: Joi.string().required(),
});
