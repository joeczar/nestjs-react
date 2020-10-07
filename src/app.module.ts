import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number(),
        MAILDEV_INCOMING_USER:Joi.string().required(),
        MAILDEV_INCOMING_PASS: Joi.string().required()
      }),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    EmailModule,
  ],
  controllers: [UserController, AuthController, AppController],
  providers: [EmailService, AuthService, AppService, ],
})
export class AppModule {}
