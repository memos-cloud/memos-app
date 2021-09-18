import { Action, Thunk } from 'easy-peasy'
import { themes } from '../../config/themes'

type accessToken = null | string

interface Theme {
  primary: string
  google: string
  facebook: string
  secondary: string
  grey: string
  black: string
  white: string
  borderColor: string
  activeOpacity: number
}

export interface StoreModel {
  accessToken: accessToken
  profile: any
  uploadProgress: { uploaded: number; filesCount: number }
  startUpload: Action<StoreModel, number>
  resetUploadProgress: Action<StoreModel>
  fileUploaded: Action<StoreModel>
  setProfile: Action<StoreModel, any>
  theme: Theme
  changeTheme: Action<StoreModel, themes>
  saveTheme: Thunk<StoreModel, any>
  getTheme: Thunk<StoreModel>
  Login: Thunk<StoreModel, accessToken>
  Logout: Thunk<StoreModel>
  LogoutAction: Action<StoreModel>
  LoginAction: Action<StoreModel, accessToken>
}
