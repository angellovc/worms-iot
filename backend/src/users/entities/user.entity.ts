import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Agent } from 'src/agents/entities/agent.entity';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({
        required: true
    })
    firstName: string;
    @Prop({
        required: true
    })
    lastName: string;
    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Agent.name }] })
    agents: Types.Array<Agent>
}


export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password']
        return ret
    }
});