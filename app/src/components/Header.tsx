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
        <View style={styles.imgParent}>
          <Image
            source={require('../assets/Images/Logo.png')}
            style={styles.img}
          />
        </View>
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
  img: {
    width: 22,
    height: 22 * 1.6,
  },
  imgParent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
