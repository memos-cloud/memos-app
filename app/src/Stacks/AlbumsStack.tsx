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
import { FC } from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { useQueryClient } from 'react-query'
import { HomeStackParamList } from '../@types/StackParamList'
import { useStoreState } from '../@types/typedHooks'
import { MyHeader } from '../components/Header'
import { colors } from '../config/colors'
import AlbumFilesScreen from '../screens/AlbumFilesScreen'
import { ConfirmationModalScreen } from '../screens/ConfirmationModalScreen'
import AlbumsScreen from '../screens/AlbumsScreen'
import { ChooseAlbumsScreen } from '../screens/ChooseAlbumsScreen'
import { CreateNewAlbumScreen } from '../screens/CreateNewAlbum'
import { EditAlbumScreen } from '../screens/EditAlbumScreen'
import PickImages from '../screens/PickImagesScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { AssetsPreviewScreen } from '../screens/AssetsPreviewScreen'

const Stack = createStackNavigator<HomeStackParamList>()

interface Props {}

export const AlbumsStack: FC<Props> = () => {
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
              options: { headerRight, title },
            }) =>
              name !== 'AddFiles' ? (
                <MyHeader
                  title={title || name}
                  back={back}
                  navigation={navigation}
                  headerRight={headerRight}
                />
              ) : null,
            ...CustomScreenTransition,
          }}
        >
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
          <Stack.Screen name='Albums'>
            {(props) => <AlbumsScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name='AlbumFiles' component={AlbumFilesScreen} />
          <Stack.Screen name='NewAlbum' component={CreateNewAlbumScreen} />
          <Stack.Screen
            initialParams={{ albumId: 'kmdsam7138d1@E!2ioejwjdauds' }}
            name='AddFiles'
            component={PickImages}
          />
          <Stack.Screen name='EditAlbum' component={EditAlbumScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            header: ({ back, navigation, options: { headerRight, title } }) => (
              <MyHeader
                title={title!}
                back={back}
                navigation={navigation}
                headerRight={headerRight}
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
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        >
          <Stack.Screen name='AssetsPreview' component={AssetsPreviewScreen} />

          <Stack.Screen
            name='ConfirmationModal'
            component={ConfirmationModalScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  )
}
