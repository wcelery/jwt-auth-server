import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: UserDto): Promise<User | undefined> {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async findOne(username: string): Promise<User> {
    console.log('async findOne():', username);

    return this.userModel.findOne({ username });
  }
}
