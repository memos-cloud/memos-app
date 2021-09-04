import React, { FC } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { AppNavProps } from '../@types/NavProps'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { MyText } from '../components/MyText'
import { themes } from '../config/themes'

const themesColumnNum = 4
const marginRightBetweenBoxes = 10
const themeBoxSize =
  (Dimensions.get('screen').width - 40 - marginRightBetweenBoxes * 3) / 4

const SettingsScreen: FC<AppNavProps<'Settings'>> = ({ navigation, route }) => {
  const colors = useStoreState((state) => state.theme)
  const changeTheme = useStoreActions((actions) => actions.changeTheme)
  const saveTheme = useStoreActions((actions) => actions.saveTheme)

  const SelectTheme = ({ colors }: { colors: any }) => {
    return (
      <View style={styles.themesParent}>
        {themes.map((theme, index) => {
          const color: themes = Object.keys(theme)[0] as any
          const selectedTheme = theme[color] === colors.primary

          return (
            <TouchableOpacity
              onPress={async () => {
                changeTheme(color)
                await saveTheme(theme)
              }}
              activeOpacity={colors.activeOpacity}
              key={color}
              style={[
                styles.themeBox,
                {
                  backgroundColor: theme[color],
                  borderColor: colors.white,
                  borderWidth: selectedTheme ? 3.5 : 1,
                  marginRight:
                    (index + 1) % themesColumnNum ? marginRightBetweenBoxes : 0,
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 25,
        paddingHorizontal: 20,
      }}
    >
      <MyText size='lg'>App Theme</MyText>
      <SelectTheme colors={colors} />
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
