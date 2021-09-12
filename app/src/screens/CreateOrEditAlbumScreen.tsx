import { Formik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { createAlbum } from '../api/createAlbum'
import { updateAlbum } from '../api/updateAlbum'
import Container from '../components/Container'
import Input from '../components/Input'
import { MyButton } from '../components/MyButton'
import { useKeyboardHeight } from '../Hooks/useKeyboardHeight'

export const CreateOrEditAlbumScreen: FC<HomeNavProps<'NewAlbum'>> = ({
  navigation,
  route: { params },
}) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const colors = useStoreState((state) => state.theme)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        loading && <ActivityIndicator size='small' color={colors.primary} />,
    })
  }, [loading])

  const keyboardHeight = useKeyboardHeight()
  const offset = useSharedValue(0)

  useEffect(() => {
    offset.value = keyboardHeight
  }, [keyboardHeight])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -offset.value + (offset.value ? 12 : 0) }],
    }
  })

  const saveAlbumHandler = async ({ name }: { name: string }) => {
    if (!loading) {
      setLoading(true)
      const albums: any = queryClient.getQueryData('albums')
      let albumId: string

      if (params?.albumName) {
        await updateAlbum({ name }, params.albumId)
        const foundAlbum = albums.find(
          ({ album }: any) => album.id === params.albumId
        )

        foundAlbum.album.name = name
        foundAlbum.id = foundAlbum._id
        delete foundAlbum._id

        await queryClient.setQueryData(
          'albums',
          albums.map((album: any) => {
            if (album.album.id === params.albumId) {
              return foundAlbum
            }
            return album
          })
        )
        albumId = params.albumId
      } else {
        const newAlbum = { album: await createAlbum(name), albumCover: null }

        newAlbum.album.id = newAlbum.album._id
        delete newAlbum.album._id

        await queryClient.setQueryData('albums', [newAlbum, ...albums])
        albumId = newAlbum.album.id
      }

      setLoading(false)

      navigation.navigate('AlbumFiles', { id: albumId })
    }
  }

  const [initialValues, setInitialValues] = useState({ name: '' })

  useEffect(() => {
    if (params?.albumName) {
      setInitialValues({ name: params.albumName })
    }
  }, [params])

  useEffect(() => {
    if (params?.albumName) {
      navigation.setOptions({
        title: 'Edit Album',
      })
    }
  }, [params])

  return (
    <Container
      customStyles={{
        padding: 18,
        paddingBottom: keyboardHeight ? 0 : 12,
      }}
    >
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={saveAlbumHandler}
      >
        {({ handleChange, handleBlur, values, handleSubmit }) => {
          return (
            <TouchableWithoutFeedback
              accessible={false}
              style={{ flex: 1 }}
              onPress={() => Keyboard.dismiss()}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  label={'Album name'}
                  placeholder={'Family Trip'}
                />
                <Animated.View style={[animatedStyles]}>
                  <MyButton
                    text={`${params?.albumName ? 'Edit' : 'Save'} Album`}
                    onPress={handleSubmit}
                    bg={colors.primary}
                    customStyles={{ opacity: values.name.length ? 1 : 0.5 }}
                    disabled={values.name.length ? false : true}
                  />
                </Animated.View>
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      </Formik>
    </Container>
  )
}

const styles = StyleSheet.create({})
