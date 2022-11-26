import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Agent extends Document {
    @Prop({ unique: true })
    name: string;
}
export const AgentSchema = SchemaFactory.createForClass(Agent);