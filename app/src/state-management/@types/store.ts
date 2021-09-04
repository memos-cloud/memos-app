import { Action, Thunk } from 'easy-peasy'

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

type themes = 'orange' | 'purble' | 'pink' | 'pin2' | 'green' | 'blue'

export interface StoreModel {
  accessToken: accessToken
  theme: Theme
  changeTheme: Action<StoreModel, themes>
  Login: Thunk<StoreModel, accessToken>
  Logout: Thunk<StoreModel>
  LogoutAction: Action<StoreModel>
  LoginAction: Action<StoreModel, accessToken>
}
