import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RoleDocument = Role & mongoose.Document;

@Schema()
export class Role {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
