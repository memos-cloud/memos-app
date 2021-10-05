import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Document } from 'mongoose'
import { Album } from './Album.schema'
import { User } from './User.schema'

export type FileDocument = File & Document

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  _id: mongoose.Schema.Types.ObjectId

  @Prop({ required: true })
  key: string

  @Prop({ required: true })
  mimetype: string

  @Prop()
  duration?: number

  @Prop({ required: true })
  size: number

  @Prop({ required: true })
  deviceFileUrl: string

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Album', required: true })
  albumId: Album | string

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User', required: true })
  owner: User | string
}

export const FileSchema = SchemaFactory.createForClass(File)
