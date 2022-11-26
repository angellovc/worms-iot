import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mail.service';
import configTypes from 'src/config/config-types';
import { ConfigType } from '@nestjs/config';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: (config: ConfigType<typeof configTypes>) => ({
                transport: {
                    service: config.nodemailer.service,
                    auth: {
                        user: config.nodemailer.email,
                        pass: config.nodemailer.pass
                    }
                }
            }),
            inject: [configTypes.KEY]
        })

    ],
    providers: [MailService],
})
export class MailModule { }
