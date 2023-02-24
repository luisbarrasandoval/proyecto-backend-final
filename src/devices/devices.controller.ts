import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MidechileGuard } from 'src/midechile/midechile.guard';
import { DevicesService } from './devices.service';
import { NewGrup } from './dto/new-grup.dto';
 

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
  on(@Body('id') id: string, @Req() req) {
    return this.devicesService.on(id, req.user);
  }

  @Post('addGroup')
  @UseGuards(MidechileGuard)
  addGroup(@Body() data: NewGrup, @Req() req) {
    return this.devicesService.addGroup(data, req.user);
  }

  @Post('off')
  @UseGuards(MidechileGuard)
  off(@Body('id') id: string, @Req() req) {
    return this.devicesService.off(id, req.user);
  }

  @Post('toggle')
  @UseGuards(MidechileGuard)
  toggle(@Body('id') id: string, @Req() req) {
    return this.devicesService.toggle(id, req.user);
  }
}
