import { ConfigModule } from '@nestjs/config';
import configSchema from './config-schema';
import configTypes from './config-types';


export default ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
    load: [
        configTypes
    ],
    validationSchema: configSchema
});
