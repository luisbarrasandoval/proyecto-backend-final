import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { DevicesModule } from './devices/devices.module';
import { CronModule } from './cron/cron.module';
require('dotenv').config()

const { MONGO_URI } = process.env

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }), MongooseModule.forFeature([{
    name: 'User',
    schema: UserSchema
  }]), DevicesModule, CronModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
