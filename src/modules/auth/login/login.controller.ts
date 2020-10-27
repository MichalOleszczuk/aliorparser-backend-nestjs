import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto } from '../../users/dto/login-user.dto';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('login')
export class LoginController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  sayHello() {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    const { access_token } = await this.authService.login(loginUserDto);
    response.cookie('Authorization', access_token);

    return response.end();
  }
}
