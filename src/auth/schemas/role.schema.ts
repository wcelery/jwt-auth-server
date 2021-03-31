import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type RoleDocument = Role & mongoose.Document;

@Schema()
export class Role {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
  name: string[];
}

export const UserSchema = SchemaFactory.createForClass(Role);
