import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/register.controller';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: { expiresIn: '60s' },
        secretOrPrivateKey: configService.get('authConfig.jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [LoginService, AuthService, LocalStrategy],
})
export class AuthModule {}
