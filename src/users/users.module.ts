import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/auth/schemas/role.schema';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]), // connects with AppModule
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
