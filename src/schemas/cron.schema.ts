import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User,  } from './user.schema';

export type CronDocument = HydratedDocument<Cron>;

@Schema()
export class Cron {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name, excludeIndexes: true })
  user: User


  @Prop({ required: true, type: Date })
  startDate: Date

  @Prop({ required: true, type: Date })
  endDate: Date

  @Prop({required: true})
  grup: string[]
}

export const CronSchema = SchemaFactory.createForClass(Cron);
