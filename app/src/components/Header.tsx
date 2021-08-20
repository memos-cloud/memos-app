import React, { FC } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../config/colors'
import { MyText } from './MyText'
import Profile from './Profile'

interface Props {
  title: string
}

export const MyHeader: FC<Props> = ({ title }) => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.secondary }}>
      <View style={styles.parent}>
        <MyText size='md'>{title}</MyText>
        <Image
          source={require('../assets/Images/Logo.png')}
          style={{ width: 22, height: 22 * 1.6 }}
        />
        <Profile />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.secondary,
    flexDirection: 'row',
  },
})
