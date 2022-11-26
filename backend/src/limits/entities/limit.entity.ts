
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, BooleanExpression } from 'mongoose';
import { Agent } from 'src/agents/entities/agent.entity';
import { Incident } from 'src/incidents/entities/incident.entity';
import { User } from 'src/users/entities/user.entity';
import { LimitName } from '../enums/limit-name.enum';

@Schema({timestamps: true})
export class Limit extends Document {
 
    @Prop({type: Types.ObjectId, ref: User.name})
    user: Types.ObjectId;


    @Prop({type: Types.ObjectId, ref: Agent.name})
    agent: Types.ObjectId;

    @Prop({required: true, enum: LimitName})
    name:LimitName;

    @Prop({required: true, type: Number})
    min:number;

    @Prop({required: true, type: Number})
    max:number;

    @Prop({required: false, type: Types.ObjectId, default: null})
    openIncident:Types.ObjectId;

    @Prop({type: [{type: Types.ObjectId, ref: Incident.name}]})
    incidents: Types.Array<Incident>;
}

export const LimitSchema = SchemaFactory.createForClass(Limit);
// LimitSchema.set('toJSON', {
//     transform: function(doc, ret, opt) {
//         delete ret['openIncident'];
//         return ret;
//     }
// });