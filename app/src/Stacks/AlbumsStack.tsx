import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack'
import {
  StackCardInterpolationProps,
  StackCardStyleInterpolator,
} from '@react-navigation/stack/lib/typescript/src/types'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { useQueryClient } from 'react-query'
import { HomeStackParamList } from '../@types/StackParamList'
import { useStoreState } from '../@types/typedHooks'
import { MyHeader } from '../components/Header'
import { colors } from '../config/colors'
import AlbumFilesScreen from '../screens/AlbumFilesScreen'
import AlbumsScreen from '../screens/AlbumsScreen'
import { ChooseAlbumsScreen } from '../screens/ChooseAlbumsScreen'
import { CreateNewAlbumScreen } from '../screens/CreateNewAlbum'
import PickImages from '../screens/PickImagesScreen'
import { ProfileScreen } from '../screens/ProfileScreen'

const Stack = createStackNavigator<HomeStackParamList>()

function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update the state to force render
}

export const AlbumsStack = () => {
  const CustomScreenTransition: {
    cardStyleInterpolator: StackCardStyleInterpolator
  } = {
    gestureDirection: 'horizontal',
    transitionSpec: {
      open: TransitionSpecs.TransitionIOSSpec,
      close: TransitionSpecs.TransitionIOSSpec,
    },

    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({
      current,
      next,
      layouts,
    }: StackCardInterpolationProps) => {
      return {
        cardStyle: {
          opacity: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8],
              })
            : 1,
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              scale: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.85],
                  })
                : 1,
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      }
    },
  } as any

  const profile = useStoreState((state) => state.profile)

  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <Stack.Navigator initialRouteName='Albums'>
        <Stack.Group
          screenOptions={{
            cardOverlayEnabled: true,
            header: ({
              route: { name },
              back,
              navigation,
              options: { headerRight },
            }) =>
              name !== 'AddFiles' ? (
                <MyHeader
                  title={name}
                  back={back}
                  navigation={navigation}
                  headerRight={headerRight}
                  profilePic={profile?.profilePic}
                />
              ) : null,
            ...CustomScreenTransition,
          }}
        >
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
          <Stack.Screen name='Albums' component={AlbumsScreen} />
          <Stack.Screen name='AlbumFiles' component={AlbumFilesScreen} />
          <Stack.Screen name='NewAlbum' component={CreateNewAlbumScreen} />
          <Stack.Screen
            initialParams={{ albumId: 'kmdsam7138d1@E!2ioejwjdauds' }}
            name='AddFiles'
            component={PickImages}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            header: ({ back, navigation, options: { headerRight, title } }) => (
              <MyHeader
                title={title!}
                back={back}
                navigation={navigation}
                headerRight={headerRight}
                profilePic={profile?.profilePic}
              />
            ),
            presentation: 'modal',
          }}
        >
          <Stack.Screen
            options={{ title: 'Choose Album' }}
            name='ChooseAlbumsScreen'
            component={ChooseAlbumsScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  )
}
