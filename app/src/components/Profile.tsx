import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function Profile() {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.parent}>
      <Image
        style={styles.img}
        source={{
          uri: 'https://lh3.googleusercontent.com/a-/AOh14GjW0MIL7__0qzYG_dPh12Qo6K--xZcKjcSlBi8wOw=s96-c',
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  parent: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 2,
  },
  img: {
    flex: 1,
  },
})
