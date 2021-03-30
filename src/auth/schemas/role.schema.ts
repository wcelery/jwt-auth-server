import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema()
export class Role {
  @Prop([String])
  name: string[];
}

export const UserSchema = SchemaFactory.createForClass(Role);
