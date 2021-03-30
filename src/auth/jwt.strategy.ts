import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //how JWT will be extracted from the request
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    }); //config
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}