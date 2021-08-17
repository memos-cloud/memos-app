import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { File } from './File.schema'
import { User } from './User.schema'

export type AlbumDocument = Album & Document

@Schema({ timestamps: true })
export class Album {
  _id: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true, unique: true })
  description: string

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  owner: User | string
}

export const AlbumSchema = SchemaFactory.createForClass(Album)