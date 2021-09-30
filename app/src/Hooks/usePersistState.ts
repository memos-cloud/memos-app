import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { differenceInSeconds, parseISO } from 'date-fns'

export const usePersistState = <T>(value: T, key: string) => {
  const [state, setState] = useState(value)

  interface PersistedState {
    state: any
    date: Date
  }
  useEffect(() => {
    const getSavedState = async () => {
      const value = await AsyncStorage.getItem(key)

      if (value) {
        const saved = JSON.parse(value) as PersistedState
        if (key === 'timer') {
          const diff = differenceInSeconds(
            new Date(),
            parseISO(saved.date as any),
          )
          setState((saved.state - diff > 0 ? diff : 0) as any)
        } else {
          setState(saved.state)
        }
      }
    }
    getSavedState()
  }, [])

  useEffect(() => {
    const persist = async () => {
      await AsyncStorage.setItem(
        key,
        JSON.stringify({ state, date: new Date() } as PersistedState),
      )
    }
    persist()
  }, [state])

  return [state, setState] as [T, React.Dispatch<React.SetStateAction<T>>]
}
