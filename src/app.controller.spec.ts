import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {Request} from 'express'
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './user/user.entity';
import { mockedConfigService } from './utils/mocks/config.service';
import { mockedJwtService } from './utils/mocks/jwt.service';
import mockedUser from './utils/mocks/user.mock';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


describe('AppController', () => {
  let app: NestExpressApplication;
  let userData: User;
  let findOne: jest.Mock;
  let userService: UserService;
  beforeEach(async () => {
    userData = {
      ...mockedUser
    }
    findOne = jest.fn();
    const userRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve())
    }
    const module = await Test.createTestingModule({
      imports:[AuthModule,
        UserModule,],
      controllers: [AppController],
      providers: [
        UserService,
        AuthService,
        AppService,
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: getRepositoryToken(User),
          useValue: userRepository
        }
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('ejs');

    await app.init();
  });

  describe('root redurects to /welcome if user not logged in', () => {
    it('should redirect to /welcome if not authenticated', () => {
      return request(app.getHttpServer())
          .get('/')
          .expect(301)
    });
  });
});
