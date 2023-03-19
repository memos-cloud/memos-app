import AsyncStorage from '@react-native-async-storage/async-storage'
import { action, createStore, thunk } from 'easy-peasy'
import { getProfile } from '../api/getProfile'
import { colors } from '../config/colors'
import { themes } from '../config/themes'
import { Store } from './@types/easy-peasy-store'
import { queryClient } from './react-query-store'

// Easy Peasy
const store = createStore<Store>({
  // State
  accessToken: null,
  authenticated: false,
  profile: null,
  theme: colors,
  assetIndex: 0,
  uploadProgressFiles: [],
  uploadProgress: { filesCount: 0, uploaded: 0 },

  // Actions
  updateUploadProgressFiles: action((state, payload) => {
    state.uploadProgressFiles = [...state.uploadProgressFiles, payload]
  }),
  resetUploadProgressFiles: action((state) => {
    state.uploadProgressFiles = []
  }),
  setAssetIndex: action((state, index) => {
    state.assetIndex = index
  }),
  authenticate: action((state) => {
    state.authenticated = true
  }),
  deauthenticate: action((state) => {
    state.authenticated = false
  }),
  startUpload: action((state, payload) => {
    state.uploadProgress = {
      ...state.uploadProgress,
      filesCount: state.uploadProgress.filesCount + payload,
    }
  }),
  fileUploaded: action((state) => {
    state.uploadProgress = {
      filesCount: state.uploadProgress.filesCount,
      uploaded: state.uploadProgress.uploaded + 1,
    }
  }),
  resetUploadProgress: action((state) => {
    state.uploadProgress = { filesCount: 0, uploaded: 0 }
  }),
  changeTheme: action((state, theme) => {
    const colors: any[] = []
    themes
      .map((theme) => theme.colors)
      .map((type) => type.map((color) => colors.push(color)))

    const selectedTheme = colors.find((e: any) => Object.keys(e)[0] === theme)

    if (selectedTheme)
      state.theme = {
        ...state.theme,
        primary: (selectedTheme as any)[Object.keys(selectedTheme!)[0]],
      }
  }),
  saveTheme: thunk(async (_actions, theme) => {
    await AsyncStorage.setItem('theme', JSON.stringify(theme))
  }),
  getTheme: thunk(async (actions) => {
    const theme = await AsyncStorage.getItem('theme')
    if (theme) {
      const themeColor = Object.keys(JSON.parse(theme))[0] as any
      actions.changeTheme(themeColor)
    }
  }),
  LoginAction: action((state, payload) => {
    state.accessToken = payload
  }),
  Login: thunk(async (actions, accessToken) => {
    await AsyncStorage.setItem('accessToken', accessToken!)
    actions.LoginAction(accessToken)

    const profile = await getProfile(accessToken!)
    actions.setProfile(profile)
  }),
  setProfile: action((state, profile) => {
    state.profile = profile
  }),
  LogoutAction: action((state) => {
    state.accessToken = null
    queryClient.clear()
  }),
  Logout: thunk(async (actions) => {
    await AsyncStorage.removeItem('accessToken')
    actions.LogoutAction()
  }),
})

export { store }
