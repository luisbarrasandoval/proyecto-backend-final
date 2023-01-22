import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { MidechileGuard } from './midechile/midechile.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/login")
  getHello(@Req() req) {
    const token = req.query.token;
    if (token) {
      return this.appService.token(token);
    }
    
    return "No token provided";
  }

  @Get("/currentUser")
  @UseGuards(MidechileGuard)
  getCurrentUser(@Req() req) {
    return req.user;
  }
}