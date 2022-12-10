import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config()

const { MONGO_URI } = process.env

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
