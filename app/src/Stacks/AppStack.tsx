import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as Permissions from 'expo-permissions'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { Fonts } from '../@types/fonts'
import { AppStackParamList } from '../@types/StackParamList'
import { useStoreState } from '../@types/typedHooks'
import { MyHeader } from '../components/Header'
import { HomeFilledIcon } from '../components/icons/HomeFilled'
import { HomeOutlineIcon } from '../components/icons/HomeOutline'
import { SettingsFilledIcon } from '../components/icons/SettingsFilled'
import { SettingsOutlineIcon } from '../components/icons/SettingsOutline'
import { IconWrapper } from '../components/IconWrapper'
import SettingsScreen from '../screens/SettingsScreen'
import { AlbumsStack } from './AlbumsStack'

const Tab = createBottomTabNavigator<AppStackParamList>()

const tabWidth = Dimensions.get('screen').width / 2

export const AppStack = () => {
  const colors = useStoreState((state) => state.theme)

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
      const { granted } = await Permissions.getAsync('mediaLibrary')
      if (!granted) await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
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
        })}
      >
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name='Home'
        >
          {(props) => <AlbumsStack {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Settings'
          options={{
            header: ({
              route: { name },
              navigation,
              options: { headerRight },
            }) =>
              name !== 'AddFiles' ? (
                <MyHeader
                  title={name}
                  back={undefined}
                  navigation={navigation}
                  headerRight={headerRight}
                />
              ) : null,
          }}
          component={SettingsScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
