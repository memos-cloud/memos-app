import AsyncStorage from '@react-native-async-storage/async-storage'
import { action, createStore, thunk } from 'easy-peasy'
import { StoreModel } from './@types/store'

const store = createStore<StoreModel>({
  accessToken: null,
  LoginAction: action((state, payload) => {
    state.accessToken = payload
  }),
  Login: thunk(async (actions, payload) => {
    await AsyncStorage.setItem('accessToken', payload!)
    actions.LoginAction(payload)
  }),
})

export { store }
