import { AppState } from 'react-native'
import { focusManager, QueryClient } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental'
import AsyncStorage from '@react-native-async-storage/async-storage'

// React Query
const DAY = 1000 * 60 * 60 * 24
const FIVE_MINUTES = 1000 * 60 * 5
export const queryClient = new QueryClient({
  // cacheTime is the duration React Query stores inactive data before it is deleted from the cache
  // staleTime is the duration data is considered fresh - once it's stale any new calls to the query will trigger a re-fetch from the server.
  defaultOptions: { queries: { staleTime: DAY, cacheTime: FIVE_MINUTES } },
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
  maxAge: DAY,
})
