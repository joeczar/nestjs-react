import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Request} from 'express'
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

describe('AppController', () => {
  let appController: AppController;
  let authService: AuthService;
  let userService: UserService
  let jwtService: JwtService
  let configService: ConfigService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UserModule, DatabaseModule],
      controllers: [AppController],
      providers: [AppService, AuthService, UserService, JwtService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService)
    userService = app.get<UserService>(UserService)
    jwtService = app.get<JwtService>(JwtService)
    configService = app.get<ConfigService>(ConfigService)
  });

  describe('root', () => {
    it('if not authenticated should redirect to /welcome', () => {
      expect(appController).toBeUndefined();
    });
  });
});
