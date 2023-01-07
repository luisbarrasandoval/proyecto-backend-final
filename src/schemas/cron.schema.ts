import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Grup, GrupSchema } from './grup.schema';
import { User,  } from './user.schema';

export type CronDocument = HydratedDocument<Cron>;

@Schema()
export class Cron {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name, excludeIndexes: true })
  user: User

  @Prop({ required: false,  type: GrupSchema, default: { name: 'default' } })
  grup: Grup

  @Prop({ required: true, type: Date })
  date: Date
}

export const CronSchema = SchemaFactory.createForClass(Cron);
