import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getDevices from 'src/midechile/getDevices';
import toogleDevices from 'src/midechile/toogleDevices';
import { Devices, DevicesDocument } from 'src/schemas/devices.schema';
import { Grup, GrupDocument } from 'src/schemas/grup.scheme';

import { User } from 'src/schemas/user.schema';
import { NewGrup } from './dto/new-grup.dto';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Devices.name) private diviceModel: Model<DevicesDocument>,
    @InjectModel(Grup.name) private grupModel: Model<GrupDocument>,
  ) {}

  async findAll(user: User) {
    const sid = user.eid;
    const integrationDevices = await getDevices(sid);
    const devices = await this.diviceModel.find({ idUser: user.id });
    const grups = await this.grupModel.find({ idUser: user.id });

    const extraGrups = grups.reduce((acc, curr) => {
      const { name } = curr;
      acc[name] = [];
      return acc;
    }, {});
    
    

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

    console.log(groups)
    return {
      ...extraGrups,
      ...groups,
    }
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


  async addGroup(data: NewGrup, user: User) {
    const payload = {
      idUser: user.id,
      order: 10000000,
      grupName: data.name,
      idIntegration: data.id,
    }

    const existGrup = await this.grupModel.findOne({
      name: data.name
    })
    if (!existGrup) {
      await this.grupModel.create({
        idUser: user.id,
        name: data.name
      })
    }

    const device = await this.diviceModel.findOne({ idIntegration: data.id });
    if (device) {
      await this.diviceModel.findOneAndUpdate({ idIntegration: data.id }, payload);
    } else {
      await this.diviceModel.create(payload);
    }

    return {status: 'ok'}
  }
}
