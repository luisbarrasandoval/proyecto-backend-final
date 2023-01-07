import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import getDevices from './midechile/getDevices';
import getSession from './midechile/getSession';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async token(token: string) {
    const data = await getSession(token);

    const existingUser = await this.userModel.findOne({ id: data.id });
    if (existingUser) {
      existingUser.name = data.name;
      existingUser.token = data.token;
      existingUser.save();
      return data;
    }

    const newUser = new this.userModel({
      id: data.id,
      name: data.name,
      token: data.token,
    });
    newUser.save();

    return data;
  }
}
