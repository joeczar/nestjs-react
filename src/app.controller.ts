import { Controller, Get, Render, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import JwtAuthGuard from './auth/jwtAuth.guard';
import RequestWithAuth from './auth/requestWithAuth.interface';
import { AuthExceptionFilter } from './exceptions/auth.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @Get(['welcome', 'welcome/register', 'welcome/log-in'])
  @Render('index')
  getWelcome(@Req() req: RequestWithAuth, @Res() res: Response) {
    const { Authentication } = req.cookies;
    if (Authentication) {
      const verified = this.authService.verifyToken(Authentication)
      if (verified) {
        return res.redirect('/');
      }
    }
  }
 
  @UseGuards(JwtAuthGuard)
  @UseFilters(new AuthExceptionFilter())
  @Get('*')
  @Render('index')
  authenticate() {

  }
}
