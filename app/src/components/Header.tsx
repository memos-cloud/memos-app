import React, { FC, memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQueryClient } from 'react-query'
import { useStoreState } from '../@types/typedHooks'
import { ArrowIcon } from './Arrow'
import { Logo } from './Logo'
import { MyText } from './MyText'
import { Profile } from './Profile'

interface Props {
  title: string
  back?:
    | {
        title: string
      }
    | undefined
  navigation: any
  headerRight?: any
  profilePic?: string
}

export const MyHeader: FC<Props> = memo(
  ({ title, back, navigation, headerRight: HeaderRight, profilePic }) => {
    const colors = useStoreState((state) => state.theme)

    return (
      <SafeAreaView style={{ backgroundColor: colors.secondary }}>
        <View
          style={[
            styles.parent,
            {
              backgroundColor: colors.secondary,
              borderBottomColor: colors.borderColor,
            },
          ]}
        >
          {back && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  paddingLeft: 5,
                }}
                activeOpacity={colors.activeOpacity}
                onPress={() => navigation.goBack()}
              >
                <ArrowIcon width={21} />
              </TouchableOpacity>
              <MyText
                size='md'
                customStyles={{
                  position: 'absolute',
                  left: '120%',
                  bottom: 2,
                }}
              >
                {title}
              </MyText>
            </View>
          )}
          {!back && <MyText size='md'>{title}</MyText>}
          {!back && (
            <View style={styles.imgParent}>
              <Logo />
            </View>
          )}
          {back && HeaderRight && <HeaderRight />}
          {!back && profilePic && (
            <Profile
              profilePic={profilePic}
              goToProfile={() => navigation.navigate('ProfileScreen')}
            />
          )}
          {!back && !profilePic && (
            <View
              style={{
                width: 37,
                height: 37,
              }}
            />
          )}
        </View>
      </SafeAreaView>
    )
  }
)

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection: 'row',
    borderBottomWidth: 1,
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
