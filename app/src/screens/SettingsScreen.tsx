import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { FC } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { LockIcon } from '../components/icons/LockIcon'
import { PaintIcon } from '../components/icons/Paint'
import { ResetIcon } from '../components/icons/ResetIcon'
import { MyText } from '../components/MyText'
import { themes } from '../config/themes'

const marginRightBetweenBoxes = 7
const themeBoxSize =
  (Dimensions.get('window').width - 40 / 0.3 - marginRightBetweenBoxes * 3) / 4

const SettingsScreen: FC<HomeNavProps<'Settings'>> = () => {
  const colors = useStoreState((state) => state.theme)
  const changeTheme = useStoreActions((actions) => actions.changeTheme)
  const saveTheme = useStoreActions((actions) => actions.saveTheme)
  const deauthenticate = useStoreActions((actions) => actions.deauthenticate)

  const SelectTheme = ({ colors }: { colors: any }) => {
    const shutupEslint = {}

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
    await AsyncStorage.removeItem('auth2')
    deauthenticate()
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 25,
        paddingHorizontal: 20,
      }}
    >
      <View style={[styles.colorsContainer, { alignItems: 'center' }]}>
        <PaintIcon size={27} />
        <MyText customStyles={{ marginLeft: 6 }} size="lg">
          App Theme
        </MyText>
      </View>
      <SelectTheme colors={colors} />
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
            marginVertical: 12,
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
            Configure Lock
          </MyText>
        </View>
      </TouchableOpacity>
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
})
