import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configTypes from 'src/config/config-types';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        @Inject(configTypes.KEY) private config:ConfigType<typeof configTypes>

    ) { }

    public sendOpenIncident(email: string, incidentType: string, value: number) {
        const mail = this.mailerService;
        return new Promise((resolve, reject) => {
            mail
                .sendMail({
                    to: email, // list of receivers
                    from: this.config.nodemailer.email, // sender address
                    subject: `⚠️ Opened: ${incidentType} Incident`, // Subject line
                    text: `${incidentType} has reached the threshold with a value of ${value}`, // plaintext body
                    html: `<b>${incidentType} has reached the threshold with a value of ${value}</b>`, // HTML body content
                })
                .then(() => { console.log('Sent message'); resolve('sent') })
                .catch((error) => { console.log(error); reject() });
        })
    }

    public sendCloseIncident(email: string, incidentType: string, value: number) {
        const mail = this.mailerService;
        return new Promise((resolve, reject) => {
            mail
                .sendMail({
                    to: email, // list of receivers
                    from: this.config.nodemailer.email, // sender address
                    subject: `✅ Closed: ${incidentType} Incident`, // Subject line
                    text: `${incidentType} incident was closed with a value of ${value}. It's now among the safe ranges`, // plaintext body
                    html: `<b>${incidentType} incident was closed with a value of ${value}. It's now among the safe ranges</b>`, // HTML body content
                })
                .then(() => { console.log('Sent message'); resolve('sent') })
                .catch((error) => { console.log(error); reject() });
        })
    }

}