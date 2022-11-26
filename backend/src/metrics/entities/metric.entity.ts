import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Number, Types} from 'mongoose';
import { Agent } from 'src/agents/entities/agent.entity';

@Schema({timestamps: true})
export class Metric extends Document {

    @Prop({
        type:Number,
        required:true
    })
    temperature:number;

    @Prop({
        type:Number,
        required:true
    })
    humidity:number;

    @Prop({
        type:Number,
        required:true
    })
    heatIndex:number;

    @Prop({type: Types.ObjectId, ref: Agent.name, excludeIndexes: true})
    agent: Agent|Types.ObjectId
}


export const MetricSchema = SchemaFactory.createForClass(Metric);