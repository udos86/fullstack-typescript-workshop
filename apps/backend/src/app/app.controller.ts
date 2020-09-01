import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';
import { CreateUserDto } from './user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/users')
  create(@Body() body: CreateUserDto) {
    console.log(body);
    return `"New user ${body.firstName} ${body.lastName} created"`;
  }
}
