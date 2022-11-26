import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ObjectIdPipePipe } from 'src/common/pipes/object-id-pipe.pipe';
import { User } from 'src/users/entities/user.entity';
import { DeleteLimitDocs, GetLimitsDoc, PatchLimitDocs, PostLimitDocs } from '../apidocs/limit-docs';
import { CreateLimitDTO } from '../dtos/create-limit.dto';
import { UpdateLimitDTO } from '../dtos/update-limit.dto';
import { LimitService } from '../services/limit.service';

@ApiTags('Limit')
@UseGuards(JwtAuthGuard)
@Controller('limit')
export class LimitController {

    private logger = new Logger("LimitController");

    constructor(
        private limitService: LimitService
    ) { }

    @GetLimitsDoc()
    @Get()
    async getLimits(
        @Request() request
    ) {
        const user: User = request.user;
        this.logger.log(`Getting limits of user ${user._id}`);
        return this.limitService.findAll(user.id);
    }

    @PostLimitDocs()
    @Post()
    async createLimit(
        @Request() request,
        @Body() body: CreateLimitDTO
    ) {
        const user: User = request.user;
        this.logger.log(`Creating limit of user ${user._id}`);
        return await this.limitService.create(user.id, body);
    }

    @PatchLimitDocs()
    @Patch(':limitId')
    async updateLimit(
        @Param('limitId', ObjectIdPipePipe) limitId: Types.ObjectId,
        @Request() request,
        @Body() body: UpdateLimitDTO
    ) {

        const user: User = request.user;
        this.logger.log(` limit of user ${user._id}`);
        return this.limitService.update(user.id, limitId, body);
    }

    @DeleteLimitDocs()
    @Delete(':limitId')
    async deleteLimit(
        @Param('limitId', ObjectIdPipePipe) limitId: Types.ObjectId,
        @Request() request,
        @Body() body: UpdateLimitDTO
    ) {
        const user: User = request.user;
        this.logger.log(`Deleting limit of user ${user._id}`);
        return this.limitService.delete(user.id, limitId);
    }
}
