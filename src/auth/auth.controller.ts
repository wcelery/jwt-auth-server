import { Controller, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  @Post('signup')
  test() {
    return 'test';
  }

  @Post('signin')
  test1() {
    return 'tes1';
  }
}
