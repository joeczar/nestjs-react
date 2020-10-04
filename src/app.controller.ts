import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import RequestWithUser from './auth/requestWithUser.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  @Get('/welcome')
  @Render('index')
  getWelcome(@Req() request: RequestWithUser, @Res() res: Response) {
    const { user } = request;

    if (user) {
      user.password = 'undefined';
      res.redirect('/');
      return user
    } 
    
  }

  @Get('*')
  @Render('index')
  authenticate(@Req() request: RequestWithUser, @Res() res: Response) {
    const { user } = request;

    if (user) {
      user.password = 'undefined';
      return user;
    } else {
      res.redirect('/welcome');
    }
    // return user;
  }
}
