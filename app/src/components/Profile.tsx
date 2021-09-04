import React, { FC, memo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../config/colors'
import { SmoothFastImage } from './SmoothFastImage'

interface Props {
  goToProfile: () => void
  profilePic: string
}

export const Profile: FC<Props> = memo(
  ({ goToProfile, profilePic }) => {
    return (
      <TouchableOpacity
        onPress={goToProfile}
        activeOpacity={colors.activeOpacity}
        style={styles.parent}
      >
        <SmoothFastImage
          style={styles.img}
          resizeMode='cover'
          source={{
            uri: profilePic,
          }}
        />
      </TouchableOpacity>
    )
  },
  (prev, next) => {
    return prev.profilePic === next.profilePic
  }
)

const styles = StyleSheet.create({
  parent: {
    width: 37,
    height: 37,
    borderRadius: 37 / 2,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 2,
  },
  img: {
    width: 37,
    height: 37,
  },
})
