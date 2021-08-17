import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { deleteFiles } from 'src/aws/deleteFiles'
import { uploadFile } from 'src/aws/uploadFile'
import { Album } from 'src/models/Album.schema'
import { File } from 'src/models/File.schema'
import { User, UserDocument } from 'src/models/User.schema'
import { CreateOrUpdateAlbumDto, DeleteAlbumFilesDto } from './dto/albums.dto'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  getMyAlbums(userId: string, { take, skip }: { take: number; skip: number }) {
    return this.albumModel.find({ owner: userId }).limit(take).skip(skip)
  }

  getMyAlbumFiles(
    userId: string,
    albumId: string,
    { take, skip }: { take: number; skip: number },
  ) {
    return this.fileModel
      .find({ owner: userId, albumId })
      .limit(take)
      .skip(skip)
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

  async uploadFiles(
    id: string,
    files: Array<Express.Multer.File>,
    userId: string,
    user: UserDocument,
  ) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    const fileSizesArr = files.map((file) => file.size / 1048576)

    const filesSize = fileSizesArr.reduce((value, currentValue) => {
      return value + currentValue
    }, 0)

    if (user.usage + filesSize > parseInt(process.env.QUOTA_LIMIT!)) {
      throw new HttpException("You've Reached Your Quota Limit!", 404)
    }

    const uploadAlbumFiles = async () => {
      const albumFiles: {
        key: string
        albumId: string
        owner: string
        size: number
      }[] = []

      const promises = files.map(async (file) => {
        const fileName = Date.now() + '.' + file.mimetype.split('/')[1]
        const folderName = album.name + '-' + album.id + '/'

        const key = folderName + fileName

        albumFiles.push({
          key,
          albumId: album.id,
          owner: userId,
          size: file.size / 1048576,
        })

        return uploadFile({
          buffer: file.buffer,
          fileName,
          folder: folderName,
          mimetype: file.mimetype,
        })
      })

      await Promise.all(promises)

      return albumFiles
    }

    const albumFiles = await uploadAlbumFiles()
    await this.fileModel.insertMany(albumFiles)

    user.usage = parseFloat((user.usage + filesSize).toFixed(1))
    await user.save()

    return album.save()
  }

  async deleteAlbumFiles(
    user: UserDocument,
    userId: string,
    id: string,
    { filesIds }: DeleteAlbumFilesDto,
  ) {
    const findObject: FilterQuery<File> = {
      _id: { $in: filesIds },
      albumId: id,
      owner: userId,
    }
    const files = await this.fileModel.find(findObject)

    const fileSizesArr = files.map((file) => file.size)

    const filesSize = fileSizesArr.reduce((value, currentValue) => {
      return value + currentValue
    }, 0)

    user.usage = parseFloat((user.usage - filesSize).toFixed(1))

    await user.save()

    await deleteFiles({ keys: files.map((file) => file.key) })

    return this.fileModel.deleteMany(findObject)
  }
}
