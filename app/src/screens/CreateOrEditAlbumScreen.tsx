import { Formik } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, StyleSheet, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useQueryClient } from 'react-query'
import { AppNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import { createAlbum } from '../api/createAlbum'
import { updateAlbum } from '../api/updateAlbum'
import Container from '../components/Container'
import Input from '../components/Input'
import { MyButton } from '../components/MyButton'
import { useKeyboardHeight } from '../Hooks/useKeyboardHeight'
import Album from '../components/Album'
import { v4 as uuidv4 } from 'uuid'

export const CreateOrEditAlbumScreen: FC<AppNavProps<'NewAlbum'>> = ({
  navigation,
  route: { params },
}) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const colors = useStoreState((state) => state.theme)

  const keyboardHeight = useKeyboardHeight()
  const offset = useSharedValue(0)

  useEffect(() => {
    offset.value = keyboardHeight
  }, [keyboardHeight])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -offset.value + (offset.value ? -50 : -4) }],
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
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback
                accessible={false}
                style={{ height: '100%', width: '100%' }}
                onPress={() => Keyboard.dismiss()}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Input
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      label={'Album name'}
                      placeholder={'Family Trip'}
                    />
                    <Album
                      disabled={true}
                      data={{
                        album: {
                          id: uuidv4(),
                          name: values.name.length ? values.name : 'Preview',
                          createdAt: new Date().toISOString(),
                        },
                        albumCover: null,
                      }}
                    />
                  </View>

                  <Animated.View style={[animatedStyles]}>
                    <MyButton
                      text={`${params?.albumName ? 'Edit' : 'Save'} Album`}
                      onPress={handleSubmit}
                      bg={colors.primary}
                      customStyles={{ opacity: values.name.length ? 1 : 0.5 }}
                      disabled={values.name.length ? false : true}
                      color={loading ? 'transparent' : colors.white}
                    />
                    {loading && (
                      <ActivityIndicator
                        style={[
                          StyleSheet.absoluteFillObject,
                          {
                            top: '-17%',
                          },
                        ]}
                        size='small'
                        color={colors.white}
                      />
                    )}
                  </Animated.View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )
        }}
      </Formik>
    </Container>
  )
}

const styles = StyleSheet.create({})
