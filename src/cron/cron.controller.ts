import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MidechileGuard } from 'src/midechile/midechile.guard';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post()
  @UseGuards(MidechileGuard)
  create(@Req() req, @Body() createCronDto: CreateCronDto) {
    return this.cronService.create(createCronDto, req.user);
  }

  @Get()
  @UseGuards(MidechileGuard)
  findAll() {
    return this.cronService.findAll();
  }

  @Get(':id')
  @UseGuards(MidechileGuard)
  findOne(@Param('id') id: string) {
    return this.cronService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(MidechileGuard)
  update(@Param('id') id: string, @Body() updateCronDto: UpdateCronDto) {
    return this.cronService.update(+id, updateCronDto);
  }

  @Delete(':id')
  @UseGuards(MidechileGuard)
  remove(@Param('id') id: string) {
    return this.cronService.remove(+id);
  }
}
