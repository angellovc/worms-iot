import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Limit, LimitSchema } from 'src/limits/entities/limit.entity';
import { IncidentService } from './service/incident.service';
import { IncidentController } from './controllers/incident.controller';
import { Incident, IncidentSchema } from './entities/incident.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Incident.name,
                schema: IncidentSchema
            },
            {
                name: Limit.name,
                schema: LimitSchema
            }
        ])
    ],
    providers: [IncidentService],
    controllers: [IncidentController]
})
export class IncidentModule { }
