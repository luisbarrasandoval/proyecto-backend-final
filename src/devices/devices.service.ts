import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getDevices from 'src/midechile/getDevices';
import { Devices, DevicesDocument } from 'src/schemas/devices.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Devices.name) private diviceModel: Model<DevicesDocument>,
  ) {}

  async findAll(user: User) {
    const sid = user.eid;
    const integrationDevices = await getDevices(sid);
    const devices = await this.diviceModel.find({ idUser: user.id });

    for (const iDevices of integrationDevices) {
      const device = devices.find((d) => d.idIntegration === iDevices.id);
      if (device) {
        iDevices.group = {
          name: device.grupName,
          order: device.order,
        }
      }
    }

    const groups = integrationDevices.reduce((acc, {group, ...rest}) => {
      let name, order
      if (group) {
        name = group.name
        order = group.order
      } else {
        name = "Sin grupo",
        order = 0
      }
      if(!acc[name]) {
        acc[name] = [{...rest, group: name, order}];
      } else {
        acc[name].push({...rest, group: name, order});
      }
      return acc;
    }, {});

    return groups
  }

  async on(id: string) {
  }

  async off(id: string) {
  }
}
