import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { Cron, CronSchema } from 'src/schemas/cron.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cron.name, schema: CronSchema }])],
  controllers: [CronController],
  providers: [CronService]
})
export class CronModule {}
