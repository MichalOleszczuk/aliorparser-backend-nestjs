import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { LoginController } from './login/login.controller';
import { RegisterController } from './register/register.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        signOptions: { expiresIn: configService.get('authConfig.jwtExpiresIn') },
        secretOrPrivateKey: configService.get('authConfig.jwtSecret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController, RegisterController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
