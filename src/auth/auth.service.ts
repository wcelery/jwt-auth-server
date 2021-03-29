import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async signUp() {
    /* const newUser = new this.UserModel({username: 'test'}) */
  }
}
