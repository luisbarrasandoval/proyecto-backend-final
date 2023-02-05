import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getDevices from 'src/midechile/getDevices';
import toogleDevices from 'src/midechile/toogleDevices';
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

  async on(id: string, user: User) {
    const sid = user.eid;
    const status = await toogleDevices({
      sid,
      id,
      name: 'on rele',
      param: '1',
    })
    return status
  }

  async off(id: string, user: User) {
    const sid = user.eid;
    const status = await toogleDevices({
      sid,
      id,
      name: 'off rele',
      param: '1',
    })
    return status
  }

  async toggle(id: string, user: User) {
    const on = await this.on(id, user);
    await (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    })();
    const off = await this.off(id, user);
    return {on, off}
  }
}
