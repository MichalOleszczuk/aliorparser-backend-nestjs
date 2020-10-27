import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../../users/dto';
import { AuthService } from '../auth.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async register(@Body() reqBody: CreateUserDto) {
    const user = await this.authService.register(reqBody);
    return user;
  }
}
