import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, HydratedDocument } from 'mongoose';

import { DevicesSchema, Devices } from './devices.schema';

export type GrupDocument = HydratedDocument<Grup>;

@Schema()
export class Grup {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [DevicesSchema], default: []})
  devices: Collection<Devices>;
}

export const GrupSchema = SchemaFactory.createForClass(Grup);
