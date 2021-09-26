import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { Center } from '../components/Center'
import { MyText } from '../components/MyText'

export const PINCodeScreen = () => {
  const colors = useStoreState((state) => state.theme)
  const authenticate = useStoreActions((state) => state.authenticate)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      <Center>
        <MyText>PIN Code Soon...</MyText>
      </Center>
    </SafeAreaView>
  )
}
