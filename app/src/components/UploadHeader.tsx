import React, { memo } from 'react'
import { FC } from 'react'
import { Dimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStoreState } from '../@types/typedHooks'
import { ArrowIcon } from './icons/Arrow'
import { DropDownArrow } from './icons/DropDownArrow'
import { MyText } from './MyText'

interface Props {
  goBack: any
  disableChoosingAlbums: boolean
  openModal: any
  albumTitle: string
  uploadAssetsHandler: any
}

export const UploadHeader: FC<Props> = memo(
  ({
    albumTitle,
    goBack,
    openModal,
    disableChoosingAlbums,
    uploadAssetsHandler,
  }) => {
    const colors = useStoreState((state) => state.theme)

    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.secondary,
          borderWidth: 1,
          borderBottomColor: colors.borderColor,
        }}
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: colors.secondary,
            alignItems: 'center',
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={{
              padding: 12,
              paddingLeft: 20,
            }}
            activeOpacity={colors.activeOpacity}
            onPress={goBack}
          >
            <ArrowIcon width={21} />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: -1,
            }}
          >
            <TouchableOpacity
              disabled={disableChoosingAlbums}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={openModal}
              activeOpacity={colors.activeOpacity}
            >
              <MyText
                numberOfLines={1}
                customStyles={{
                  textAlign: 'center',
                  paddingVertical: 16,
                  marginRight: 6,
                  maxWidth: Dimensions.get('screen').width / 2.8,
                  opacity: disableChoosingAlbums ? 0.6 : 1,
                }}
              >
                {albumTitle}
              </MyText>
              <DropDownArrow
                width={15}
                fill={
                  disableChoosingAlbums
                    ? 'rgba(255, 255, 255, 0.6)'
                    : colors.white
                }
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!disableChoosingAlbums}
            onPress={uploadAssetsHandler}
            style={{
              paddingRight: 20,
            }}
            activeOpacity={colors.activeOpacity}
          >
            <MyText
              customStyles={{
                color: colors.primary,
                opacity: !disableChoosingAlbums ? 0.6 : 1,
              }}
            >
              Upload
            </MyText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
)
