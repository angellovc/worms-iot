import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configTypes from '../config/config-types';

@Global()
@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigType<typeof configTypes>) => {
                const {
                    dbName,
                    host,
                    pass,
                    port,
                    user,
                    connection
                } = config.mongo;

                return {
                    uri: `${connection}://${host}:${port}`,
                    user,
                    pass,
                    dbName
                }
            },
            inject: [configTypes.KEY]
        })
    ],
    exports: [MongooseModule]
})
export class DatabaseModule { }
