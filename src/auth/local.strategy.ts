import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Error } from 'mongoose';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); //there can be some {options}
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('no user provided');
    }
    return user;
  }
}