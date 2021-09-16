import { StackNavigationProp } from '@react-navigation/stack'
import { format, parseISO } from 'date-fns'
import { LinearGradient } from 'expo-linear-gradient'
import React, { FC, memo } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppStackParamList } from '../@types/StackParamList'
import { useStoreState } from '../@types/typedHooks'
import { MyText } from './MyText'
import { SmoothFastImage } from './SmoothFastImage'

interface Props {
  data: {
    album: {
      id: string
      name: string
      createdAt: string
    }
    albumCover: {
      id: string
      key: string
      mimetype: string
      fileURL: string
      deviceFileUrl: string
      createdAt: string
    } | null
  }
  disabled?: boolean
  navigation?: StackNavigationProp<AppStackParamList, 'HomeTabs'>
}

const Album: FC<Props> = ({
  data: {
    album: { id, name, createdAt },
    albumCover,
  },
  navigation,
  disabled,
}) => {
  const linearGradient = albumCover
    ? ['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 0.8)']
    : ['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 0)']

  const colors = useStoreState((state) => state.theme)

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.touchable, styles.parent]}
      activeOpacity={colors.activeOpacity}
      onPress={() => {
        if (navigation) navigation.navigate('AlbumFiles', { id })
      }}
    >
      <View
        style={{
          backgroundColor: !albumCover ? colors.secondary : 'transparent',
        }}
      >
        <View style={styles.parent}>
          <SmoothFastImage
            style={[
              styles.albumCover,
              styles.parent,
              {
                borderColor: colors.borderColor,
              },
            ]}
            uri={albumCover?.fileURL}
            loadFirst={albumCover?.deviceFileUrl}
            id={albumCover?.deviceFileUrl}
          />
          <LinearGradient
            style={[{ flex: 1 }, styles.card]}
            start={[0.5, 0]}
            end={[0.5, 1]}
            colors={linearGradient}
          >
            <View style={styles.details}>
              <MyText
                numberOfLines={1}
                customStyles={{
                  maxWidth: '40%',
                  color: colors.white,
                }}
              >
                {name}
              </MyText>
              <MyText
                size='xs'
                customStyles={{ opacity: 0.57, color: colors.white }}
              >
                {format(parseISO(createdAt), 'p yyyy-MM-dd')}
              </MyText>
            </View>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Album

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  touchable: {
    marginBottom: 8,
  },
  albumCover: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1.5,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  details: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: 15,
    justifyContent: 'flex-end',
  },
})
