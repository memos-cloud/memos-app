import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Album } from 'src/models/Album.schema'
import { CreateOrUpdateAlbumDto } from './dto/albums.dto'

@Injectable()
export class AlbumsService {
  constructor(@InjectModel(Album.name) private albumModel: Model<Album>) {}

  getMyAlbums() {
    return this.albumModel.find({})
  }

  getAlbumById(id: string) {
    return this.albumModel.findById(id)
  }

  async createNewAlbum(data: CreateOrUpdateAlbumDto, owner: string) {
    const album = new this.albumModel({ ...data, owner })
    await album.save()

    return album
  }

  async updateAlbum(id: string, data: CreateOrUpdateAlbumDto) {
    const album = await this.albumModel.findById(id)

    Object.keys(data).forEach((e) => {
      album[e] = data[e]
    })

    await album.save()

    return album
  }

  async deleteAlbum(id: string) {
    const album = await this.albumModel.findById(id)
    await album.delete()

    return album
  }
}
