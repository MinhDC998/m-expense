import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { TValueof } from '@/common/types/common';
import { ROLES } from '@/common/constants/roles';
import { TUser } from './users.types';
import { BaseEntity } from '@/common/services/models/model';

export type UserDocument = User & Document & BaseEntity;

@Schema({
  collection: 'users',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class User implements TUser {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: Object.values(ROLES),
    default: ROLES.USER,
    type: String,
  })
  role: TValueof<typeof ROLES>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  const user = this as unknown as UserDocument;

  if (!user.isModified('password')) return next();

  try {
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.userResponse = function (user: UserDocument) {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
