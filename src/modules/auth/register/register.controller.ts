import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto';
import { AuthService } from '../auth.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body() reqBody: CreateUserDto) {
    const user = await this.authService.register(reqBody);
    return user;
  }
}
