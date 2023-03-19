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

export interface Store {
  // State
  accessToken: accessToken
  profile: any
  assetIndex: number
  authenticated: boolean
  uploadProgressFiles: { id: string; albumId: string }[]
  uploadProgress: { uploaded: number; filesCount: number }
  theme: Theme

  // Actions
  updateUploadProgressFiles: Action<Store, { id: string; albumId: string }>
  resetUploadProgressFiles: Action<Store>
  setAssetIndex: Action<Store, number>
  startUpload: Action<Store, number>
  authenticate: Action<Store>
  deauthenticate: Action<Store>
  resetUploadProgress: Action<Store>
  fileUploaded: Action<Store>
  setProfile: Action<Store, any>
  changeTheme: Action<Store, themes>
  saveTheme: Thunk<Store, any>
  getTheme: Thunk<Store>
  Login: Thunk<Store, accessToken>
  Logout: Thunk<Store>
  LogoutAction: Action<Store>
  LoginAction: Action<Store, accessToken>
}
