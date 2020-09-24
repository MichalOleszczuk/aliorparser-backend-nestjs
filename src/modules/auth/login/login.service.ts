import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  private readonly helloMessage: string = 'Hello world';

  sayHello(): string {
    return this.helloMessage;
  }
}
