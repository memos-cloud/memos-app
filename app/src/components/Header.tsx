import * as Progress from 'expo-progress'
import React, { FC, memo, useEffect } from 'react'
import { StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { ArrowIcon } from './icons/Arrow'
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
}

export const MyHeader: FC<Props> = memo(
  ({ title, back, navigation, headerRight: HeaderRight }) => {
    const colors = useStoreState((state) => state.theme)
    const profile = useStoreState((state) => state.profile)

    const uploadProgress = useStoreState((state) => state.uploadProgress)
    const resetUploadProgress = useStoreActions(
      (actions) => actions.resetUploadProgress
    )

    useEffect(() => {
      if (
        uploadProgress.filesCount !== 0 &&
        uploadProgress.filesCount === uploadProgress.uploaded
      ) {
        ToastAndroid.show('Files Uploaded Successfully!', ToastAndroid.SHORT)
        setTimeout(() => {
          resetUploadProgress()
        }, 1000)
      }
    }, [uploadProgress])

    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.secondary,
          borderBottomWidth: uploadProgress.filesCount ? 0 : 1,
          borderBottomColor: colors.borderColor,
        }}
      >
        <View
          style={[
            styles.parent,
            {
              backgroundColor: colors.secondary,
              paddingBottom: uploadProgress.filesCount ? 3 : 11,
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
                onPress={() => {
                  if (back.title !== 'NewAlbum' && back.title !== 'EditAlbum') {
                    navigation.goBack()
                  } else {
                    navigation.navigate('Albums')
                  }
                }}
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
          {!back && profile && (
            <Profile
              profilePic={profile?.profilePic}
              goToProfile={() => navigation.navigate('ProfileScreen')}
            />
          )}
          {!back && !profile && (
            <View
              style={{
                width: 37,
                height: 37,
              }}
            />
          )}
        </View>
        {!!uploadProgress.filesCount && (
          <>
            <MyText
              size='xs'
              customStyles={{
                textAlign: 'center',
                paddingBottom: 7,
                color: colors.white,
                opacity: 0.9,
              }}
            >
              {uploadProgress.uploaded} of {uploadProgress.filesCount} Uploaded
            </MyText>
            <Progress.Bar
              style={styles.loadingBar}
              isIndeterminate
              color={colors.primary}
              height={2}
              isAnimated={true}
            />
          </>
        )}
      </SafeAreaView>
    )
  }
)

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingLeft: 15,
    paddingVertical: 11,
    flexDirection: 'row',
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
  loadingBar: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
})
