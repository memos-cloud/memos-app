import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Album } from 'src/models/Album.schema'
import { CreateOrUpdateAlbumDto } from './dto/albums.dto'

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  getMyAlbums(userId: string) {
    return this.albumModel.find({ owner: userId })
  }

  async getAlbumById(id: string, userId: string) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }
    return album
  }

  async createNewAlbum(data: CreateOrUpdateAlbumDto, userId: string) {
    const album = new this.albumModel({ ...data, owner: userId })
    await album.save()

    return album
  }

  async updateAlbum(id: string, data: CreateOrUpdateAlbumDto, userId: string) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    Object.keys(data).forEach((e) => {
      album[e] = data[e]
    })

    await album.save()

    return album
  }

  async deleteAlbum(id: string, userId: string) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    await album.delete()

    return album
  }
}
