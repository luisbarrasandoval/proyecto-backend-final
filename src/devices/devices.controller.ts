import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MidechileGuard } from 'src/midechile/midechile.guard';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @UseGuards(MidechileGuard)
  findAll(@Req() req) {
    return this.devicesService.findAll(req.user);
  }

  @Post('on')
  @UseGuards(MidechileGuard)
  on(@Param('id') id: string) {
    return this.devicesService.on(id);
  }

  @Post('off')
  @UseGuards(MidechileGuard)
  off(@Param('id') id: string) {
    return this.devicesService.off(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }
}
