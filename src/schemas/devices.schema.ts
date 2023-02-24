import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type DevicesDocument = HydratedDocument<Devices>;

@Schema()
export class Devices {

  @Prop({ required: true })
  idUser: number;

  @Prop({ required: true })
  idIntegration: number;

  @Prop({ required: true}) // TODO: Crear un modelo para grupo
  grupName: string

  @Prop({ required: true })
  order: number
}

export const DevicesSchema = SchemaFactory.createForClass(Devices);
