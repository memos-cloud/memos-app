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
import Container from '../components/Container'
import Input from '../components/Input'
import { MyButton } from '../components/MyButton'
import { useKeyboardHeight } from '../Hooks/useKeyboardHeight'

export const CreateNewAlbumScreen: FC<HomeNavProps<'NewAlbum'>> = ({
  navigation,
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
      const album = await createAlbum(name)
      setLoading(false)

      const albums: any = queryClient.getQueryData('albums')

      album.id = album._id
      delete album._id

      await queryClient.setQueryData('albums', [
        { album, albumCover: null },
        ...albums,
      ])

      navigation.navigate('AlbumFiles', { id: album.id })
    }
  }

  return (
    <Container
      customStyles={{
        padding: 18,
        paddingBottom: keyboardHeight ? 0 : 12,
      }}
    >
      <Formik initialValues={{ name: '' }} onSubmit={saveAlbumHandler}>
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
                    text='Save Album'
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
