import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Devices, DevicesSchema } from 'src/schemas/devices.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Devices.name, schema: DevicesSchema }])],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
