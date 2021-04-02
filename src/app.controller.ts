import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  entry() {
    return 'main endpoint, proceed to /api/auth to do something useful';
  }
}
