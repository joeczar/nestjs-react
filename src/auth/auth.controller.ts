import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import JwtAuthGuard from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = 'undefined';
    return user;
  }
  @Post('register')
  async register(@Body() registrationData: RegisterDto, @Res() res: Response) {
    try {
      const authorized = await this.authService.register(registrationData);
      return res.json(authorized);
    } catch (error) {
      console.log('Error in registration', error);
      return res.json({error})
    }
  }

  @HttpCode(200)
  // @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      let { email, password } = req.body;
      const authorized = await this.authService.getAuthenticatedUser(email, password)
      console.log(authorized);

      password = 'undefined';
      const cookie = this.authService.getCookieWithJwtToken(authorized.id);
      res.setHeader('Set-Cookie', cookie);
      // 
      return res.json(authorized).redirect('/');

    } catch (error) {
      console.log('Error in /auth/log-in', error);
      res.json({error})
      
    }

  }
  @UseGuards(JwtAuthGuard)
  @Get('log-out')
  async logOut(@Req() req: RequestWithUser, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return res.redirect('/welcome');
  }
}
