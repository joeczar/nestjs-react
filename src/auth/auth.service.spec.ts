import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../user/user.entity';
import { UserService } from '../user/user.service';
import {mockedJwtService} from '../utils/mocks/jwt.service';
import {mockedConfigService} from '../utils/mocks/config.service';

describe('The AuthService', () => {
  let authService: AuthService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
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
          useValue: {},
        }
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
  })
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(
        typeof authService.getCookieWithJwtToken(userId)
      ).toEqual('string')
    })
  })
});