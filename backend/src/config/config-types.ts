import { registerAs } from "@nestjs/config";

export default registerAs('config', () => ({
    environment: process.env.ENV,
    jwtSecret: process.env.JWT_SECRET,
    nodemailer: {
        email: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
        service: process.env.NODEMAILER_SERVICE
    },
    mongo: {
        host: process.env.MONGO_HOST,
        pass: process.env.MONGO_PASSWORD,
        user: process.env.MONGO_USER,
        port: process.env.MONGO_PORT,
        dbName: process.env.MONGO_DATABASE,
        connection: process.env.MONGO_CONNECTION
    }
}));