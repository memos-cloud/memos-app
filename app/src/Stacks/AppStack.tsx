import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View } from 'react-native'
import { Fonts } from '../@types/fonts'
import { AppStackParamList } from '../@types/StackParamList'
import { MyHeader } from '../components/Header'
import { HomeFilledIcon } from '../components/HomeFilled'
import { HomeOutlineIcon } from '../components/HomeOutline'
import { ProfileFilledIcon } from '../components/ProfileFilled'
import { ProfileOutlineIcon } from '../components/ProfileOutline'
import { colors } from '../config/colors'
import HomeScreen from '../screens/Home'
import ProfileScreen from '../screens/Profile'

const Tab = createBottomTabNavigator<AppStackParamList>()

export const AppStack = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        safeAreaInsets={{ bottom: 4 }}
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.secondary,
            borderTopWidth: 0,
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
          },
          tabBarLabelStyle: {
            fontFamily: Fonts['Poppins-regular'],
          },

          tabBarIcon: ({ focused }) => {
            if (route.name === 'Home') {
              if (focused) {
                return <HomeFilledIcon />
              }
              return <HomeOutlineIcon />
            } else if (route.name === 'Profile') {
              if (focused) {
                return <ProfileFilledIcon />
              }
              return <ProfileOutlineIcon />
            }
          },

          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white,

          header: ({ route: { name } }) => (
            <MyHeader title={name === 'SaveToken' ? '' : name} />
          ),
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
      </Tab.Navigator>
      <StatusBar
        animated={true}
        backgroundColor={colors.secondary}
        style='inverted'
      />
    </NavigationContainer>
  )
}
