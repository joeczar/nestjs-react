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
import { getRepositoryToken } from '@nestjs/typeorm';
import User from './user/user.entity';
import { mockedConfigService } from './utils/mocks/config.service';
import { mockedJwtService } from './utils/mocks/jwt.service';
import mockedUser from './utils/mocks/user.mock';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepo } from './utils/mocks/MockedUserRepository';
import { AuthModule } from './auth/auth.module';

describe('AppController', () => {
  let app: INestApplication;
  let userData: User;

  beforeEach(async () => {
    userData = {
      ...mockedUser
    }
    const userRepository = {
      create: jest.fn().mockResolvedValue(userData),
      save: jest.fn().mockReturnValue(Promise.resolve())
    }
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
      controllers: [AppController],
      providers: [UserService, AppService, AuthService, {
        provide: ConfigService,
        useValue: mockedConfigService
      },
      {
        provide: JwtService,
        useValue: mockedJwtService
      },
      {
        provide: getRepositoryToken(User),
        useValue: userRepository,
      },
      {
        provide: 'UserRepository',
        useClass: UserRepo,
      }
 
    ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    
  });

  describe('root', () => {
    it('if not authenticated should redirect to /welcome', () => {
      expect(app).toBeDefined();
    });
  });
});
