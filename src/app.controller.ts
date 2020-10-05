import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import JwtAuthGuard from './auth/jwtAuth.guard';
import RequestWithUser from './auth/requestWithUser.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/welcome*')
  @Render('index')
  getWelcome(@Req() request: RequestWithUser, @Res() res: Response) {
    const { user } = request;

    if (user) {
                res.redirect('/');
                return;
              }
  }

  @UseGuards(JwtAuthGuard)
  @Get('*')
  @Render('index')
  authenticate(@Req() request: RequestWithUser, @Res() res: Response) {
    const { user } = request;

    if (user) {
    } else {
      res.redirect('/welcome');
    }
    // return user;
  }
}
