import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { group } from 'console';
import { Model } from 'mongoose';
import getDevices from 'src/midechile/getDevices';
import { Devices, DevicesDocument } from 'src/schemas/devices.schema';
import { User } from 'src/schemas/user.schema';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Devices.name) private diviceModel: Model<DevicesDocument>,
  ) {}

  async findAll(user: User) {
    const sid = user.eid;
    const devices = await getDevices(sid);

    const allDevices = {};

    for await (const device of devices) {
      if (!device) {
        continue;
      }

      const grupName = device.group || 'none';
      const deviceDoc = await this.diviceModel.findOne({ id: device.id });

      if (deviceDoc) {
        try {
          delete deviceDoc.user;
        } catch (error) {
          console.log(error);
        }

        if (allDevices[grupName]) {
          allDevices[grupName].push(device);
        } else {
          allDevices[grupName] = [device];
        }

        continue;
      }

      const newDevice = new this.diviceModel({
        ...device,
        user,
      });
      await newDevice.save();
      delete newDevice.user;
      if (allDevices[grupName]) {
        allDevices[grupName].push(device);
      } else {
        allDevices[grupName] = [device];
      }
    }

    return allDevices;
  }

  async findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  async remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
