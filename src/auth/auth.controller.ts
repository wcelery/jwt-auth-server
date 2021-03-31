import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('create')
  create(@Body() userDto: UserDto) {
    return this.usersService.create(userDto);
  }

  @UseGuards(LocalAuthGuard) //instead of @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getprofile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
