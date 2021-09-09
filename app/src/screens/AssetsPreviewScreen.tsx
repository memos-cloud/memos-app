import { Video } from 'expo-av'
import React, { createRef, useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import {
  GestureEvent,
  HandlerStateChangeEvent,
  LongPressGestureHandler,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler'
import Animated, { useSharedValue, useValue } from 'react-native-reanimated'
import Swiper from 'react-native-swiper'
import { useQueryClient } from 'react-query'
import { HomeNavProps } from '../@types/NavProps'
import { useStoreState } from '../@types/typedHooks'
import Container from '../components/Container'
import { SmoothFastImage } from '../components/SmoothFastImage'

const { width, height } = Dimensions.get('screen')

export const AssetsPreviewScreen = ({
  route: { params },
}: HomeNavProps<'AssetsPreview'>) => {
  const queryClient = useQueryClient()
  const assets = (
    queryClient.getQueryData(`albumFiles:${params.albumId}`) as any[]
  ).filter((asset) => {
    return asset.fileURL !== 'empty' && !asset?.placeholder
  })
  const colors = useStoreState((state) => state.theme)
  const [sliderActive, setSliderActive] = useState(false)
  const [moveWhileZooming, setMoveWhileZooming] = useState(true)

  const RenderItem = ({ item }: any) => {
    const baseScale = new Animated.Value<number>(1)
    const pinchScale = new Animated.Value<number>(1)
    const scale = Animated.multiply(baseScale, pinchScale)
    const scaleShared = useSharedValue(1)
    let lastScale = 1

    const gestureHandler = ({
      nativeEvent,
    }: GestureEvent<PinchGestureHandlerEventPayload>) => {
      const scale = lastScale * nativeEvent.scale
      if (scale < 6 && scale > 0.8) {
        pinchScale.setValue(nativeEvent.scale)
      }
    }

    const doubleTapRef = createRef()
    const baseTranslateX = new Animated.Value<number>(0)
    const baseTranslateY = new Animated.Value<number>(0)
    const panTranslateX = new Animated.Value<number>(0)
    const panTranslateY = new Animated.Value<number>(0)
    // Pan Gestures -- Devide by Scale
    const translateX = Animated.divide(
      Animated.add(baseTranslateX, panTranslateX),
      scale
    )
    const translateY = Animated.divide(
      Animated.add(baseTranslateY, panTranslateY),
      scale
    )

    const lastOffset = { x: 0, y: 0 }

    const onPanGestureEvent = ({
      nativeEvent,
    }: GestureEvent<PanGestureHandlerEventPayload>) => {
      if (scaleShared.value > 1) {
        panTranslateX.setValue(nativeEvent.translationX * 1.1)
        panTranslateY.setValue(nativeEvent.translationY * 1.1)
      }
    }

    // useEffect(() => {
    //   if (!moveWhileZooming && scaleShared.value > 1) {
    //     setMoveWhileZooming(true)
    //   } else if (moveWhileZooming && scaleShared.value <= 1) {
    //     setMoveWhileZooming(false)
    //   }
    // }, [scaleShared])

    const pinchStateChangeHandler = ({
      nativeEvent,
    }: GestureEvent<PinchGestureHandlerEventPayload>) => {
      const scale = lastScale * nativeEvent.scale

      if (scale < 4) {
        if (scale > 1) {
          lastScale *= nativeEvent.scale
          baseScale.setValue(lastScale)
          pinchScale.setValue(1)
        } else {
          lastScale = 1
          baseScale.setValue(lastScale)
          pinchScale.setValue(1)
          lastOffset.x = 0
          lastOffset.y = 0
          baseTranslateX.setValue(lastOffset.x)
          baseTranslateY.setValue(lastOffset.y)
        }
      } else {
        lastScale = 4
        baseScale.setValue(lastScale)
        pinchScale.setValue(1)
      }
      scaleShared.value = lastScale * 1
    }

    const panStateChangeHandler = ({
      nativeEvent,
    }: GestureEvent<PanGestureHandlerEventPayload>) => {
      if (scaleShared.value > 1) {
        lastOffset.x += nativeEvent.translationX * 1.1
        lastOffset.y += nativeEvent.translationY * 1.1
        baseTranslateX.setValue(lastOffset.x)
        baseTranslateY.setValue(lastOffset.y)
        panTranslateX.setValue(0)
        panTranslateY.setValue(0)
      }
    }

    const doubleTabHandler = ({
      nativeEvent,
    }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
      if (nativeEvent.state === State.ACTIVE) {
        // Scale The Image
        if (lastScale === 1) {
          lastScale *= 2.8
          baseScale.setValue(lastScale)
        } else {
          lastScale = 1
          baseScale.setValue(lastScale)
          lastOffset.x = 0
          lastOffset.y = 0
          baseTranslateX.setValue(lastOffset.x)
          baseTranslateY.setValue(lastOffset.y)
        }

        // Translate The Image

        // lastOffset.x += nativeEvent.x
        // lastOffset.y += nativeEvent.y
        // baseTranslateX.setValue(lastOffset.x)
        // baseTranslateY.setValue(lastOffset.y)
      }
    }

    if (item.mimetype.includes('image')) {
      return (
        <PinchGestureHandler
          onGestureEvent={gestureHandler}
          onHandlerStateChange={pinchStateChangeHandler}
        >
          <TapGestureHandler
            waitFor={doubleTapRef}
            onHandlerStateChange={doubleTabHandler}
            numberOfTaps={2}
            maxDurationMs={250}
          >
            <PanGestureHandler
              minDist={25}
              avgTouches
              onGestureEvent={onPanGestureEvent}
              onHandlerStateChange={panStateChangeHandler}
            >
              <Animated.View
                style={[
                  styles.image,
                  {
                    transform: [
                      { scale },
                      {
                        translateX,
                      },
                      {
                        translateY,
                      },
                    ],
                  },
                ]}
              >
                <SmoothFastImage
                  loadFirst={item.deviceFileUrl}
                  transitionDuration={0}
                  style={[styles.image]}
                  uri={item.fileURL}
                />
              </Animated.View>
            </PanGestureHandler>
          </TapGestureHandler>
        </PinchGestureHandler>
      )
    } else {
      return (
        <Container
          customStyles={[
            {
              padding: 0,
              justifyContent: 'center',
            },
          ]}
        >
          <Video
            useNativeControls
            resizeMode='contain'
            style={[styles.video]}
            source={{ uri: item.fileURL }}
          />
        </Container>
      )
    }
  }

  return (
    <>
      <Swiper
        alwaysBounceHorizontal={true}
        scrollEnabled={sliderActive}
        style={[styles.wrapper, { backgroundColor: colors.black }]}
        showsButtons={false}
        showsPagination={false}
        loop={false}
        onIndexChanged={(index) => {}}
        index={params.index - 1}
      >
        {assets.map((asset) => (
          <RenderItem key={asset.id} item={asset} />
        ))}
      </Swiper>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  image: {
    width: '100%',
    height: '100%',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
})
