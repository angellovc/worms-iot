import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Limit } from "src/limits/entities/limit.entity";

@Schema()
export class Incident extends Document {
    @Prop()
    value: number;

    @Prop({ type: Date, required: true, default: new Date() })
    openDate: Date

    @Prop({ type: Date, required: false, default: null })
    closeDate: Date
}

export const IncidentSchema = SchemaFactory.createForClass(Incident);

