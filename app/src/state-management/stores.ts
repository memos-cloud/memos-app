import AsyncStorage from '@react-native-async-storage/async-storage'
import { action, createStore, thunk } from 'easy-peasy'
import { AppState } from 'react-native'
import { focusManager, QueryClient } from 'react-query'
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { getProfile } from '../api/getProfile'
import { colors } from '../config/colors'
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
  theme: colors,
  changeTheme: action((state, theme) => {
    switch (theme) {
      case 'purble':
        state.theme = {
          ...state.theme,
          primary: '#7B29FF',
        }
        break
    }
  }),
  LoginAction: action((state, payload) => {
    state.accessToken = payload
  }),
  Login: thunk(async (actions, accessToken) => {
    await AsyncStorage.setItem('accessToken', accessToken!)
    actions.LoginAction(accessToken)

    const profile = await getProfile(accessToken!)
    console.log('FROM STORE', profile)
    await queryClient.setQueryData('profile', profile)
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
