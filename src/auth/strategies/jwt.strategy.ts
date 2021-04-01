import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //how JWT will be extracted from the request
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    }); //config
  }

  async validate(payload: any) {
    const user = await this.userModel.findOne({ username: payload.username });

    return {
      userId: payload.sub,
      username: payload.username,
      roles: user.roles,
    };
  }
}
