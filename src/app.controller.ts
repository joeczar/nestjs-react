import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('index')
  getHello(@Req() req: Request, @Res() res: Response) {
    return res.render('index');
  }
}
