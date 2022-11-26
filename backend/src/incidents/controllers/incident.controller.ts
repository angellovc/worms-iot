import { Controller, Get, Logger, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { GetIncidentsDocs } from '../apidocs/incident-docs';
import { FilterIncidentDTO } from '../dtos/filter-incident.dto';
import { IncidentService } from '../service/incident.service';

@ApiTags('Incident')
@UseGuards(JwtAuthGuard)
@Controller('incident')
export class IncidentController {

    private logger = new Logger("IncidentController");

    constructor(
        private incidentService: IncidentService
    ) { }

    @GetIncidentsDocs()
    @Get()
    async getIncidents(
        @Request() request,
        @Query() params: FilterIncidentDTO
    ) {
        const user: User = request.user;
        this.logger.log(`Getting incidents for user ${user._id}`);
        return this.incidentService.findAll(user.id, params);
    }

}
