import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'
import { deleteFiles } from 'src/aws/deleteFiles'
import { getFile } from 'src/aws/getFiles'
import { uploadFile } from 'src/aws/uploadFile'
import { Album } from 'src/models/Album.schema'
import { File } from 'src/models/File.schema'
import { User, UserDocument } from 'src/models/User.schema'
import {
  CreateAlbumDto,
  DeleteAlbumFilesDto,
  UpdateAlbumDto,
} from './dto/albums.dto'

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(File.name) private fileModel: Model<File>,
  ) {}

  async getMyAlbums(
    userId: string,
    { take, skip }: { take: number; skip: number },
  ) {
    const albums = await this.albumModel
      .find({ owner: userId })
      .sort({ createdAt: -1 })
      .limit(take)
      .skip(skip)

    const files = await this.fileModel.find({
      _id: { $in: albums.map((e) => e.AlbumFileId as string) },
    })

    const getAlbumCoversPromises = files.map((file) =>
      getFile({ key: file.key, file }),
    )

    const albumCovers = await Promise.all(getAlbumCoversPromises)

    const albumsCopy = albums.map((album) => {
      const coverExists = albumCovers.find((e) => e.fileURL.includes(album.id))
      const albumFields = {
        id: album.id,
        name: album.name,
        createdAt: (album as any).createdAt,
      }
      if (coverExists) {
        return {
          album: albumFields,
          albumCover: coverExists,
        }
      }

      return {
        album: albumFields,
      }
    })

    const lastFilesPromises = albumsCopy.map(async (albumObj) => {
      if (!albumObj.albumCover) {
        const lastFile = (
          await this.fileModel
            .find({
              albumId: albumObj.album.id,
              mimetype: { $regex: /image/, $options: 'i' },
            })
            .sort({ createdAt: -1 })
            .limit(1)
        )[0]

        if (!lastFile) {
          return null
        }

        return getFile({ key: lastFile.key, file: lastFile })
      }

      return 'Filtered'
    })

    const lastFileAsAlbumCovers = (await Promise.all(lastFilesPromises)).filter(
      (e) => e !== 'Filtered',
    )

    return albumsCopy.map((albumObj) => {
      if (albumObj.albumCover) {
        return albumObj
      }

      const foundCover = lastFileAsAlbumCovers.find((file: any) => {
        if (file) {
          return file.fileURL.includes(albumObj.album.id)
        }
        return false
      })

      return { ...albumObj, albumCover: foundCover }
    })
  }

  async getMyAlbumFiles(
    userId: string,
    albumId: string,
    { take, skip }: { take: number; skip: number },
  ) {
    const album = await this.albumModel.findOne({ _id: albumId, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    const files = await this.fileModel
      .find({ owner: userId, albumId })
      .sort({ createdAt: -1 })
      .limit(take)
      .skip(skip)

    const getFilePromises = files.map(({ key }) =>
      getFile({ key, file: files.find((file) => key.includes(file.key)) }),
    )

    const data = await Promise.all(getFilePromises)

    return data
  }

  async getAlbumById(id: string, userId: string) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    let albumCover: any

    if (album.AlbumFileId) {
      const file = await this.fileModel.findById(album.AlbumFileId)

      albumCover = await getFile({ key: file.key, file })
    } else {
      const file = (
        await this.fileModel
          .find({
            albumId: album.id,
            mimetype: { $regex: /image/, $options: 'i' },
          })
          .sort({ createdAt: -1 })
          .limit(1)
      )[0]

      if (!file) {
        albumCover = null
      } else {
        albumCover = await getFile({ key: file.key, file })
      }
    }

    return { album, albumCover }
  }

  async createNewAlbum(data: CreateAlbumDto, userId: string) {
    const album = new this.albumModel({ ...data, owner: userId })
    await album.save()

    return album
  }

  async updateAlbum(id: string, data: UpdateAlbumDto, userId: string) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    for (const property in data) {
      album[property] = data[property]
    }

    if (data.AlbumFileId === 'default') {
      album.AlbumFileId = undefined
      data.AlbumFileId = undefined
    }

    if (data.AlbumFileId) {
      const file = await this.fileModel.findById(data.AlbumFileId)

      if (!file) {
        throw new HttpException('File not found for the Album Cover!', 400)
      } else if (file && file.mimetype.split('/')[0] !== 'image') {
        throw new HttpException(
          'You can only set an Image to be an Album Cover!',
          400,
        )
      }
    }

    await album.save()

    return album
  }

  async deleteAlbum(id: string, userId: string, user: UserDocument) {
    const album = await this.albumModel.findOne({ _id: id, owner: userId })

    if (!album) {
      throw new HttpException('Album Not Found!', 404)
    }

    await album.delete()

    const findObject: FilterQuery<File> = { albumId: id }

    this.deleteFiles(findObject, user)

    return album
  }

  async uploadFiles(
    id: string,
    files: Array<any>,
    userId: string,
    user: UserDocument,
    deviceFileUrl: string,
  ) {
    if (!files) {
      throw new HttpException('Files are required to Upload them.', 400)
    }
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
        mimetype: string
        deviceFileUrl: string
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
          mimetype: file.mimetype,
          deviceFileUrl,
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

    return {
      ok: true,
      message: `${files.length} Files Uploaded Successfuly!`,
    }
  }

  async deleteFiles(findObject: any, user: UserDocument) {
    const files = await this.fileModel.find(findObject)

    const fileSizesArr = files.map((file) => file.size)

    const filesSize = fileSizesArr.reduce((value, currentValue) => {
      return value + currentValue
    }, 0)

    await deleteFiles({ keys: files.map((file) => file.key) })

    user.usage = parseFloat((user.usage - filesSize).toFixed(1))

    await user.save()

    return this.fileModel.deleteMany(findObject)
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

    return this.deleteFiles(findObject, user)
  }
}
