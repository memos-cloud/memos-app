import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Fonts } from '../@types/fonts'
import { AppStackParamList } from '../@types/StackParamList'
import { MyHeader } from '../components/Header'
import { HomeFilledIcon } from '../components/HomeFilled'
import { HomeOutlineIcon } from '../components/HomeOutline'
import { SettingsFilledIcon } from '../components/SettingsFilled'
import { SettingsOutlineIcon } from '../components/SettingsOutline'
import { colors } from '../config/colors'
import SettingsScreen from '../screens/SettingsScreen'
import { AlbumsStack } from './AlbumsStack'
import { Dimensions } from 'react-native'
import { IconWrapper } from '../components/IconWrapper'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

const Tab = createBottomTabNavigator<AppStackParamList>()

const tabWidth = Dimensions.get('screen').width / 2

export const AppStack = () => {
  const MyTheme = {
    dark: true,
    colors: {
      primary: colors.primary,
      background: colors.black,
      card: colors.black,
      text: colors.white,
      border: colors.borderColor,
      notification: colors.black,
    },
  }

  useEffect(() => {
    const removeSplashScreen = async () => {
      await SplashScreen.hideAsync()
    }
    removeSplashScreen()
  }, [])

  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        style='light'
      />
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
            if (route.name === 'Home') {
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
          headerShown: false,
        })}
      >
        <Tab.Screen name='Home' component={AlbumsStack} />
        <Tab.Screen
          name='Settings'
          options={{
            header: ({ route: { name }, navigation }) => (
              <MyHeader
                title={name === 'SaveToken' ? '' : name}
                navigation={navigation}
              />
            ),
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
