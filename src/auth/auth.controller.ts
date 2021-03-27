import { Controller, Get } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  @Get('signup')
  test() {
    return 'test';
  }
}
