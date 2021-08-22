import { Action, Thunk } from 'easy-peasy'

type accessToken = null | string

export interface StoreModel {
  accessToken: accessToken
  Login: Thunk<StoreModel, accessToken>
  LoginAction: Action<StoreModel, accessToken>
}
