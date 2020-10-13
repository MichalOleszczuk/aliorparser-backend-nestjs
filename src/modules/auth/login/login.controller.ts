import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get()
  sayHello(): string {
    return this.loginService.sayHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post()
  @HttpCode(200)
  async login(@Req() request: Request, @Res() response: Response) {
    const { access_token } = await this.authService.login(request.user);
    response.cookie('Authorization', { Bearer: access_token });

    return response.end();
  }
}
