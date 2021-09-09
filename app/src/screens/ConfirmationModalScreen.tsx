import BottomSheet from '@gorhom/bottom-sheet'
import React, { useMemo, useRef } from 'react'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Fonts } from '../@types/fonts'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { deleteAlbum } from '../api/deleteAlbum'
import { MyButton } from '../components/MyButton'
import { MyText } from '../components/MyText'

export const ConfirmationModalScreen = ({
  navigation,
  route: { params },
}: HomeNavProps<'ConfirmationModal'>) => {
  const colors = useStoreState((state) => state.theme)
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ['25%'], [])

  const goBack = () => navigation.goBack()

  const Logout = useStoreActions((state) => state.Logout)

  const [actionLoading, setActionLoading] = useState(false)

  const confirmHandler = async () => {
    if (params.actionType === 'logout') {
      Logout()
    }
    if (params.actionType === 'deleteAlbum' && params.deleteId) {
      setActionLoading(true)
      await deleteAlbum(params.deleteId)
      setActionLoading(false)
      navigation.navigate('Albums')
    }
  }

  return (
    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', flex: 1 }}>
      <BottomSheet
        detached={true}
        bottomInset={35}
        onClose={goBack}
        handleStyle={{
          backgroundColor: colors.secondary,
          borderRadius: 100,
        }}
        handleIndicatorStyle={{ backgroundColor: colors.primary }}
        backgroundStyle={{ backgroundColor: colors.secondary }}
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={styles.sheetContainer}
      >
        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 25,
            flex: 1,
            alignItems: 'center',
          }}
        >
          <MyText
            size='md'
            customStyles={{
              fontFamily: Fonts['Poppins-bold'],
              textAlign: 'center',
            }}
          >
            {params.title}
          </MyText>
          <View style={styles.buttonsContainer}>
            <MyButton
              customStyles={{ borderRadius: 10 }}
              btnStyles={{
                padding: 11,
                paddingHorizontal: 17,
                borderRadius: 10,
              }}
              text={'Cancel'}
              bg={'#272727'}
              onPress={goBack}
            />
            <View>
              <MyButton
                customStyles={{ borderRadius: 10 }}
                btnStyles={{
                  padding: 11,
                  paddingHorizontal: 17,
                  borderRadius: 10,
                  // marginLeft: 10,
                }}
                text={'Confirm'}
                color={actionLoading ? 'transparent' : colors.white}
                bg={colors.primary}
                onPress={confirmHandler}
              />
              {actionLoading && (
                <ActivityIndicator
                  style={{
                    position: 'absolute',
                    top: '-17%',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  size='small'
                  color={colors.white}
                />
              )}
            </View>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {
    marginHorizontal: 20,
  },
  buttonsContainer: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
})
