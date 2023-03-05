import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cron, CronDocument } from 'src/schemas/cron.schema';
import { User } from 'src/schemas/user.schema';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

@Injectable()
export class CronService {

  constructor( @InjectModel(Cron.name) private cronModel: Model<CronDocument>) {}

  async create(createCronDto: CreateCronDto, user: User) {

    const preexist = await this.cronModel.findOne({ name: createCronDto.name, user: user.id });
    if (preexist) {
      return preexist;
    }

    const newCron = new this.cronModel({
      ...createCronDto,
      user: user.id
    });
    return newCron.save();
  }

  findAll() {
    const data = this.cronModel.find();
    return data;
  }

  findOne(id: string) {
    const data = this.cronModel.findById(id);
    return data;
  }

  update(id: number, updateCronDto: UpdateCronDto) {
    return `This action updates a #${id} cron`;
  }

  async remove(id: string) {
    try {
      const item = await this.cronModel.findByIdAndDelete(id);
      console.log(item);
      return 'ok';
    }
    catch (error) {
      return error;
    }
  }
}
