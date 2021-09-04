import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEvent } from 'react-native'

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height)
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0)
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow)
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide)
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide)
    }
  }, [])

  return keyboardHeight
}
