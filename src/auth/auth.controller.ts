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
import { LocalAuthGuard } from './localAuth.guard';
import JwtAuthGuard from './jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) { }
  
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
      const userId = await this.authService.register(registrationData);
      if (userId) {
        return res.redirect('/auth/log-in')
      }
    } catch (error) {
      return res.json({ msg: 'Error in POST /register', error });
      console.log('Error in POST /register', error);
      
    }
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = 'undefined';
    return response.send(user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
