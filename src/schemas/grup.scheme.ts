import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type GrupDocument = HydratedDocument<Grup>;

@Schema()
export class Grup {

  @Prop({ required: true })
  idUser: number;

  @Prop({ required: true}) 
  name: string

}

export const GrupSchema = SchemaFactory.createForClass(Grup);
