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
  AssetsPreview: { albumId: string; index: number }
  ConfirmationModal: {
    title: string
    actionType: 'logout' | 'deleteAlbum'
    deleteId?: string
  }
  EditAlbum: { albumId: string }
  AlbumFiles: { id: string }
  NewAlbum: { albumName: string; albumId: string } | undefined
  AddFiles: { deviceAlbumId: string; albumTitle?: string; albumId: string }
  ChooseAlbumsScreen: { albumId: string }
  ProfileScreen: undefined
}