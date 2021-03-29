import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @UseGuards(LocalAuthGuard) //instead of @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(@Request() req) {
    return req.user;
  }
}
