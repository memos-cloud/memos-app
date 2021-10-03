import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Dimensions } from 'react-native'
import { Fonts } from '../@types/fonts'
import { HomeTabsParamList } from '../@types/StackParamList'
import { MyHeader } from '../components/Header'
import { HomeFilledIcon } from '../components/icons/HomeFilled'
import { HomeOutlineIcon } from '../components/icons/HomeOutline'
import { SettingsFilledIcon } from '../components/icons/SettingsFilled'
import { SettingsOutlineIcon } from '../components/icons/SettingsOutline'
import { IconWrapper } from '../components/IconWrapper'
import { colors } from '../config/colors'
import AlbumsScreen from '../screens/AlbumsScreen'
import SettingsScreen from '../screens/SettingsScreen'

const tabWidth = Dimensions.get('window').width / 2

const Tab = createBottomTabNavigator<HomeTabsParamList>()

export const HomeAndSettingsTabs = () => (
  <Tab.Navigator
    safeAreaInsets={{ bottom: 4 }}
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: colors.secondary,
        borderTopColor: colors.borderColor,
        height: 65,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        overflow: 'hidden',
      },
      tabBarLabelStyle: {
        fontFamily: Fonts['Poppins-regular'],
      },
      tabBarButton: ({ onPress, children }) => {
        return (
          <IconWrapper
            style={{ alignSelf: 'center' }}
            onPress={onPress}
            tabWidth={tabWidth}
          >
            {children}
          </IconWrapper>
        )
      },
      tabBarIcon: ({ focused }) => {
        if (route.name === 'Albums') {
          if (focused) {
            return <HomeFilledIcon />
          }
          return <HomeOutlineIcon />
        } else if (route.name === 'Settings') {
          if (focused) {
            return <SettingsFilledIcon />
          }
          return <SettingsOutlineIcon />
        }
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.white,
    })}
  >
    <Tab.Screen
      options={{
        header: ({ route: { name }, navigation, options: { headerRight } }) => (
          <MyHeader
            title={name}
            navigation={navigation}
            headerRight={headerRight}
          />
        ),
      }}
      name="Albums"
      component={AlbumsScreen}
    />
    <Tab.Screen
      name="Settings"
      options={{
        header: ({ route: { name }, navigation, options: { headerRight } }) => (
          <MyHeader
            title={name}
            navigation={navigation}
            headerRight={headerRight}
          />
        ),
      }}
      component={SettingsScreen}
    />
  </Tab.Navigator>
)
