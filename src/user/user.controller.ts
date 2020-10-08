import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAll(@Res() res: Response) {
    const users = await this.userService.getAll();
    return res.json(users)
  }
}
