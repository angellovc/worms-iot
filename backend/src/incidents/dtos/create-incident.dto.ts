import { Type } from "class-transformer";
import { IsDefined, IsMongoId } from "class-validator";
import { Types } from "mongoose";


export class CreateIncidentDTO {

    @IsDefined()
    @Type(({ object }) => Types.ObjectId)
    @IsMongoId()

    limit: Types.ObjectId;

}