import AsyncStorage from '@react-native-async-storage/async-storage'
import { action, createStore, thunk } from 'easy-peasy'
import { AppState } from 'react-native'
import { focusManager, QueryClient } from 'react-query'
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { getProfile } from '../api/getProfile'
import { colors } from '../config/colors'
import { themes } from '../config/themes'
import { StoreModel } from './@types/store'

// React Query
const year = 1000 * 60 * 60 * 24 * 365
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: year } },
})

focusManager.setEventListener((handleFocus: any) => {
  AppState.addEventListener('change', handleFocus)

  return () => {
    AppState.removeEventListener('change', handleFocus)
  }
})

const asyncStoragePersistor = createAsyncStoragePersistor({
  storage: AsyncStorage,
})

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
  maxAge: year,
})

// Easy Peasy
const store = createStore<StoreModel>({
  accessToken: null,
  profile: null,
  theme: colors,
  changeTheme: action((state, theme) => {
    const selectedTheme = themes.find((e) => Object.keys(e)[0] === theme)

    state.theme = {
      ...state.theme,
      primary: (selectedTheme as any)[Object.keys(selectedTheme!)[0]],
    }
  }),
  saveTheme: thunk(async (actions, theme) => {
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
