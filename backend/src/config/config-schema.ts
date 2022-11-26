import * as Joi from 'joi';

export default Joi.object({
    ENV: Joi.string().valid('dev', 'test', 'prod').required(),
    JWT_SECRET: Joi.string().required(),
    MONGO_USER: Joi.string().required(),
    MONGO_PASSWORD: Joi.string().required(),
    MONGO_DATABASE: Joi.string().required(),
    MONGO_HOST: Joi.string().hostname().required(),
    MONGO_PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    NODEMAILER_EMAIL: Joi.string().required(),
    NODEMAILER_PASSWORD: Joi.string().required(),
    NODEMAILER_SERVICE: Joi.string().required(),
    SOCKET_PORT: Joi.number().positive().required()
})
