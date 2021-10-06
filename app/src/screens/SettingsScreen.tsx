import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { FC } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { LockIcon } from '../components/icons/LockIcon'
import { PaintIcon } from '../components/icons/Paint'
import { ResetIcon } from '../components/icons/ResetIcon'
import { MyText } from '../components/MyText'
import { themes } from '../config/themes'
import * as SecureStore from 'expo-secure-store'
import { StarIcon } from '../components/icons/StarIcon'
import { usePersistState } from '../Hooks/usePersistState'
import { colors } from '../config/colors'

const marginRightBetweenBoxes = 7
const themeBoxSize =
  (Dimensions.get('window').width - 40 / 0.3 - marginRightBetweenBoxes * 3) / 4

const SettingsScreen: FC<HomeNavProps<'Settings'>> = () => {
  const colors = useStoreState((state) => state.theme)
  const changeTheme = useStoreActions((actions) => actions.changeTheme)
  const saveTheme = useStoreActions((actions) => actions.saveTheme)
  const deauthenticate = useStoreActions((actions) => actions.deauthenticate)
  const [deleteAssetsAfterUpload, setDeleteAssetsAfterUpload] = usePersistState(
    false,
    'deleteAssetsAfterUpload',
  )

  const SelectTheme = ({ colors }: { colors: any }) => {
    return (
      <View style={styles.themesParent}>
        {themes.map((types) => (
          <View style={styles.themeType} key={types.type}>
            <MyText size="md">{types.type}</MyText>
            <View style={styles.colorsContainer}>
              {types.colors.map((theme, index) => {
                const color: themes = Object.keys(theme)[0] as any
                const selectedTheme = (theme as any)[color] === colors.primary

                return (
                  <TouchableOpacity
                    onPress={async () => {
                      changeTheme(color)
                      await saveTheme(theme)
                    }}
                    key={color}
                    activeOpacity={colors.activeOpacity}
                    style={[
                      styles.themeBox,
                      {
                        backgroundColor: (theme as any)[color],
                        borderColor: colors.white,
                        borderWidth: selectedTheme ? 2 : 0,
                        marginRight:
                          types.colors.length - 1 !== index
                            ? marginRightBetweenBoxes
                            : 0,
                      },
                    ]}
                  />
                )
              })}
            </View>
          </View>
        ))}
      </View>
    )
  }

  const ResetLockHandler = async () => {
    // Clean Saved Setups
    await AsyncStorage.removeItem('fingerprintSetup')
    await AsyncStorage.removeItem('auth2')
    // Clean PIN Code if available
    await SecureStore.deleteItemAsync('PIN')

    deauthenticate()
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 25,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <View style={[styles.colorsContainer, { alignItems: 'center' }]}>
          <PaintIcon size={27} />
          <MyText customStyles={{ marginLeft: 6 }} size="lg">
            App Theme
          </MyText>
        </View>
        <SelectTheme colors={colors} />
      </View>
      <View style={styles.separator} />
      <View style={styles.container}>
        <View style={[styles.colorsContainer, { alignItems: 'center' }]}>
          <StarIcon size={27} />
          <MyText
            customStyles={{ marginLeft: 6, transform: [{ translateY: 4 }] }}
            size="lg"
          >
            Features
          </MyText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
            transform: [{ translateX: -2 }],
          }}
        >
          <MyText
            customStyles={{
              marginLeft: 6,
              transform: [{ translateY: 4 }],
              maxWidth: '82%',
            }}
            size="xs"
          >
            Delete Assets from Device after Uploading them (some devices can't
            use this feature unfortunately)
          </MyText>
          <Switch
            trackColor={{
              false: 'rgba(255, 255, 255, 0.3)',
              true: 'rgba(255, 255, 255, 0.3)',
            }}
            thumbColor={deleteAssetsAfterUpload ? colors.primary : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => {
              setDeleteAssetsAfterUpload(value)
            }}
            value={deleteAssetsAfterUpload}
          />
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.container}>
        <View style={[styles.colorsContainer, { alignItems: 'center' }]}>
          <LockIcon size={27} />
          <MyText
            customStyles={{ marginLeft: 6, transform: [{ translateY: 4 }] }}
            size="lg"
          >
            Lock Screen
          </MyText>
        </View>
        <TouchableOpacity
          activeOpacity={colors.activeOpacity}
          onPress={ResetLockHandler}
        >
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 4,
            }}
          >
            <ResetIcon size={17} />
            <MyText
              customStyles={{
                color: colors.primary,
                marginLeft: 6,
                transform: [{ translateY: 1.5 }],
              }}
            >
              Reset Lock
            </MyText>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  themeBox: {
    width: themeBoxSize,
    height: themeBoxSize,
    borderRadius: 7,
    marginBottom: marginRightBetweenBoxes,
  },
  themesParent: {
    paddingTop: 10,
  },
  themeType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorsContainer: {
    flexDirection: 'row',
  },
  container: {
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 20,
  },
  separator: {
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: colors.borderColor,
    height: 3,
    marginVertical: 10,
  },
})
