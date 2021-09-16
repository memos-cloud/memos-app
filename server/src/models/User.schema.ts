import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  _id: string

  @Prop({ required: true, unique: true })
  deviceId: string

  @Prop({ required: true })
  name: string

  @Prop({ unique: true })
  email?: string

  @Prop({ required: true })
  profilePic: string

  @Prop({ required: true, default: 0 })
  usage: number
}

export const UserSchema = SchemaFactory.createForClass(User)
