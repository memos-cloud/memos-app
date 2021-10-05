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
  'Edit Album': { albumId: string }
  'Album Files': { id: string }
  'New Album': { albumName: string; albumId: string } | undefined
  'Add Files': { deviceAlbumId: string; albumTitle?: string; albumId: string }
  ChooseAlbumsScreen: { albumId: string }
  Profile: undefined
}
