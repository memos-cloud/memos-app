export type AuthStackParamList = {
  Login: undefined
  SaveToken: { token: string }
}

export type AppStackParamList = {
  Home: undefined
  Settings: undefined
}

export type HomeStackParamList = {
  Albums: undefined
  AlbumFiles: { id: string }
  NewAlbum: undefined
  AddFiles: { deviceAlbumId: string; albumTitle?: string; albumId: string }
  ChooseAlbumsScreen: { albumId: string }
  ProfileScreen: undefined
}
