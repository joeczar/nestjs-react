import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import JwtAuthGuard from './auth/jwtAuth.guard';
import RequestWithUser from './auth/requestWithUser.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @UseGuards(JwtAuthGuard)
  @Get(['welcome', 'welcome/register', 'welcome/log-in'])
  @Render('index')
  async getWelcome(@Req() request: RequestWithUser, @Res() res: Response) {
    const { user } = request;
    if (user) {
      
      return res.redirect('/');
    }
  }
  // Without the guard here both routes are triggeres at anything past /welcome causing an unhandled rejection error
  // also need a redirect in the guard otherwise It just shows an error
  @UseGuards(JwtAuthGuard)
  @Get('*')
  @Render('index')
  authenticate(@Req() request: RequestWithUser, @Res() res: Response) {
    const { user } = request;
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    if (user) {
    } else {
      return res.redirect('/welcome');
    }
    // return user;
  }
}
