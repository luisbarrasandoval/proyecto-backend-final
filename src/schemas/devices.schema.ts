import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Grup, GrupSchema } from './grup.schema';
import { User, UserSchema } from './user.schema';

export type DevicesDocument = HydratedDocument<Devices>;

@Schema()
export class Devices {

  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name, excludeIndexes: true })
  user: User

  @Prop({ required: false,  type: GrupSchema })
  grup: Grup
}

export const DevicesSchema = SchemaFactory.createForClass(Devices);
