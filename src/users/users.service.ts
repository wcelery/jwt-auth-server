import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { UserDto } from './dto/user.dto';
/* import { Role, RoleDocument } from 'src/auth/schemas/role.schema'; */

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) /* @InjectModel(Role.name) private roleModel: Model<RoleDocument>, */
  {}

  async create(userDto: UserDto): Promise<User | undefined> {
    const newUser = await this.userModel.create(userDto); //intead of new this.userModel because its easier to mock
    const saltOrRounds = 10;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    newUser.password = hash;
    return newUser.save();
  }

  /* async getRoles(): Promise<Role> {
    return this.roleModel.findOne();
  } */

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }
}
