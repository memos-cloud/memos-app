import { NavigationContainer, Theme } from '@react-navigation/native'
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackCardStyleInterpolator,
  TransitionSpecs,
} from '@react-navigation/stack'
import * as Permissions from 'expo-permissions'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { AppStackParamList } from '../@types/StackParamList'
import { useStoreActions, useStoreState } from '../state-management/typedHooks'
import { MyHeader } from '../components/Header'
import { AllPhotosId } from '../constants/serverURL'
import AlbumFilesScreen from '../screens/AlbumFilesScreen'
import { AssetsPreviewScreen } from '../screens/AssetsPreviewScreen'
import { ChooseAlbumsScreen } from '../screens/ChooseAlbumsScreen'
import { ConfirmationModalScreen } from '../screens/ConfirmationModalScreen'
import { CreateOrEditAlbumScreen } from '../screens/CreateOrEditAlbumScreen'
import PickImages from '../screens/PickImagesScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { HomeAndSettingsTabs } from './HomeTabs'
const Stack = createStackNavigator<AppStackParamList>()

export const AppStack = ({}) => {
  const colors = useStoreState((state) => state.theme)
  const setAssetIndex = useStoreActions((actions) => actions.setAssetIndex)

  const MyTheme: Theme = {
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
    const getMediaLibraryPermission = async () => {
      const { granted } = await Permissions.getAsync('mediaLibrary')
      if (!granted) await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
    }
    getMediaLibraryPermission()
  }, [])

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
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        style="light"
      />
      <Stack.Navigator initialRouteName="HomeTabs">
        <Stack.Group
          screenOptions={{
            cardOverlayEnabled: true,
            header: ({
              route: { name },
              back,
              navigation,
              options: { headerRight, title },
            }) =>
              name !== 'Add Files' && name !== 'HomeTabs' ? (
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
          <Stack.Screen
            name="HomeTabs"
            listeners={{
              focus: () => {
                setAssetIndex(0)
              },
            }}
            options={({ route }) => {
              return {
                title: route.name === 'HomeTabs' ? 'Albums' : route.name,
              }
            }}
            component={HomeAndSettingsTabs}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Album Files" component={AlbumFilesScreen} />
          <Stack.Screen name="New Album" component={CreateOrEditAlbumScreen} />
          <Stack.Screen
            initialParams={{ albumId: AllPhotosId }}
            name="Add Files"
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
              />
            ),
            presentation: 'modal',
          }}
        >
          <Stack.Screen
            options={{ title: 'Choose Album' }}
            name="ChooseAlbumsScreen"
            component={ChooseAlbumsScreen}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        >
          <Stack.Screen name="AssetsPreview" component={AssetsPreviewScreen} />

          <Stack.Screen
            name="ConfirmationModal"
            component={ConfirmationModalScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
