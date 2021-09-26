export type AuthStackParamList = {
  Login: undefined
  SaveToken: { token: string }
}

export type Auth2StackParamList = {
  PINCode: undefined
  FingerPrint: undefined
  ChooseAuth: undefined
}

export type HomeTabsParamList = {
  Albums: undefined
  Settings: undefined
}

export type AppStackParamList = {
  HomeTabs: undefined
  AssetsPreview: { albumId: string; index: number }
  ConfirmationModal: {
    title: string
    actionType: 'logout' | 'deleteAlbum' | 'deleteFiles'
    deleteId?: string
  }
  EditAlbum: { albumId: string }
  AlbumFiles: { id: string }
  NewAlbum: { albumName: string; albumId: string } | undefined
  AddFiles: { deviceAlbumId: string; albumTitle?: string; albumId: string }
  ChooseAlbumsScreen: { albumId: string }
  ProfileScreen: undefined
}
