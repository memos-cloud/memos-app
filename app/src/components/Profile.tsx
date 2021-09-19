import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../config/colors'
import { SmoothFastImage } from './SmoothFastImage'

interface Props {
  goToProfile: () => void
  profilePic: string
}

const profilePicSize = 37

export const Profile: FC<Props> = ({ goToProfile, profilePic }) => {
  const smallProfilePic = profilePic?.replace(
    /=s.*?-c/,
    `=s${profilePicSize * 3}-c`
  )

  return (
    <TouchableOpacity
      onPress={goToProfile}
      activeOpacity={colors.activeOpacity}
      style={styles.parent}
    >
      <SmoothFastImage
        id={smallProfilePic}
        style={styles.img}
        uri={smallProfilePic}
        resizeMode='cover'
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: profilePicSize / 2,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 2,
  },
  img: {
    width: profilePicSize,
    height: profilePicSize,
  },
})
