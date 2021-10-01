import * as SecureStore from 'expo-secure-store'
import LottieView from 'lottie-react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import Animated from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { v4 as uuidv4 } from 'uuid'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import UnlockLottie from '../assets/lotties/unlock.json'
import { RemoveCharIcon } from '../components/icons/RemoveCharIcon'
import { MyText } from '../components/MyText'
import { usePersistState } from '../Hooks/usePersistState'

type state = 'Setup' | 'Confirm' | 'Enter'

const { width } = Dimensions.get('window')

const DotsNum = 4
const DotWidth = 18
const PadSpacing = 13
const NumberWidth = width / 4 - PadSpacing / 2
const Pads = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, 'delete']
const dotsArray = new Array(DotsNum).fill(0)
const MAX_WRONG_PIN_TIMES = 5
const SECOND = 1000
const MAX_TRIES_WAIT_SEC = 60

export const PINCodeScreen = () => {
  const colors = useStoreState((state) => state.theme)
  const authenticate = useStoreActions((state) => state.authenticate)
  const [PINCode, setPINCode] = useState('')
  const [ConfirmPINCode, setConfirmPINCode] = useState('')
  const [state, setState] = useState<state>('Setup')
  const [savedPINCode, setSavedPINCode] = useState<string | null | undefined>(
    undefined,
  )
  const lockAnimation = useRef<React.LegacyRef<LottieView>>(null)
  const [wrongPINTimes, setWrongPINTimes] = useState(0)
  const [disablePIN, setDisablePIN] = useState(false)
  const [timer, setTimer] = usePersistState(0, 'timer')

  useEffect(() => {
    if (wrongPINTimes >= MAX_WRONG_PIN_TIMES) {
      setTimer(MAX_TRIES_WAIT_SEC)
    }
  }, [wrongPINTimes])

  useEffect(() => {
    if (timer) {
      if (!disablePIN) setDisablePIN(true)

      setTimeout(() => {
        setTimer(timer! - 1)
      }, SECOND)

      const decrementedTimer = timer - 1
      showMessage({
        message: `Max Tries Reached wait ${decrementedTimer} seconds!`,
        type: 'danger',
        autoHide: decrementedTimer === 0,
        hideOnPress: false,
        animated: timer === MAX_TRIES_WAIT_SEC,
      })
    } else {
      if (disablePIN === true) {
        setWrongPINTimes(MAX_WRONG_PIN_TIMES - 2)
      }
      setDisablePIN(false)
    }
  }, [timer])

  useEffect(() => {
    const checkSavedPIN = async () => {
      const savedPIN = await SecureStore.getItemAsync('PIN')
      setSavedPINCode(savedPIN)

      if (savedPIN) {
        setState('Enter')
      }
    }
    checkSavedPIN()
  }, [])

  useEffect(() => {
    if (PINCode.length === 4) {
      if (state === 'Setup') {
        setState('Confirm')
      } else if (state === 'Enter') {
        if (savedPINCode === PINCode) {
          setWrongPINTimes(0)
          if (lockAnimation.current) {
            lockAnimation.current.play()
          }
          setTimeout(() => {
            authenticate()
          }, 500)
        } else {
          showMessage({
            message: 'Wrong PIN Code',
            type: 'danger',
          })
          setPINCode('')
          setWrongPINTimes(wrongPINTimes + 1)
        }
      }
    }
  }, [PINCode])

  useEffect(() => {
    const checkIfMatches = async () => {
      if (ConfirmPINCode.length === 4) {
        if (PINCode === ConfirmPINCode) {
          await SecureStore.setItemAsync('PIN', PINCode)
          authenticate()
        } else {
          showMessage({
            message: "Confirm PIN doesn't match!",
            type: 'danger',
          })

          setConfirmPINCode('')
        }
      }
    }

    checkIfMatches()
  }, [ConfirmPINCode])

  const OnNumPressHandler = (item: string | number) => {
    if (disablePIN) {
      return
    }
    const code = state === 'Confirm' ? ConfirmPINCode : PINCode
    const setCode = state === 'Confirm' ? setConfirmPINCode : setPINCode

    if (item !== 'delete' && code.length < 4) {
      setCode((code) => {
        return code + item
      })
    } else if (item === 'delete' && code.length) {
      setCode((code) => {
        const editedPINCode = code.slice(0, -1)

        return editedPINCode
      })
    }
  }

  const NumberRenderItem = memo(
    ({ item, index }: ListRenderItemInfo<string | number>) => {
      return item === -1 ? (
        <View
          style={[styles.emptyNumber, index % 3 !== 0 && styles.paddingLeft]}
        />
      ) : (
        <TouchableHighlight
          underlayColor={disablePIN ? 'transparent' : '#181818'}
          onPress={() => OnNumPressHandler(item)}
          style={[styles.number, index % 3 !== 0 && styles.paddingLeft]}
        >
          {item === 'delete' ? (
            <RemoveCharIcon size={30} />
          ) : (
            <MyText
              customStyles={{
                fontSize: 30,
                transform: [{ translateY: 4 }],
              }}
            >
              {item}
            </MyText>
          )}
        </TouchableHighlight>
      )
    },
  )

  const Dots = memo(() => {
    return (
      <View style={styles.dots}>
        {dotsArray.map((e, i) => {
          return (
            <Animated.View key={uuidv4()} style={[styles.dot]}>
              {i + 1 <=
                (state === 'Confirm' ? ConfirmPINCode : PINCode).length && (
                <View style={[styles.active]} />
              )}
            </Animated.View>
          )
        })}
      </View>
    )
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      {savedPINCode !== undefined && (
        <View style={styles.parent}>
          <View style={{ alignItems: 'center' }}>
            <LottieView
              ref={lockAnimation}
              style={{
                width: 45,
                height: 45,
                transform: [{ scaleY: -1 }],
              }}
              source={UnlockLottie}
            />
            <MyText customStyles={styles.title}>{state} PIN Code</MyText>
            <Dots />
          </View>
          <View style={{ height: NumberWidth * 4 + PadSpacing * 3 }}>
            <FlatList
              style={{
                width: '100%',
              }}
              contentContainerStyle={styles.numbers}
              numColumns={3}
              data={Pads}
              keyExtractor={() => uuidv4()}
              renderItem={(props) => <NumberRenderItem {...props} />}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    marginHorizontal: NumberWidth / 2,
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    marginBottom: 36,
  },
  dots: {
    flexDirection: 'row',
    width: (DotsNum + 0.8) * DotWidth,
    justifyContent: 'space-between',
  },
  dot: {
    width: DotWidth,
    height: DotWidth,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: DotWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'white',
    width: DotWidth + 2,
    height: DotWidth + 2,
    borderRadius: 100,
    borderWidth: 2,
  },
  numbers: {
    width: '100%',
    height: NumberWidth * 4 + PadSpacing * 3,
  },
  number: {
    width: NumberWidth,
    height: NumberWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: NumberWidth / 2,
    marginBottom: PadSpacing / 2,
  },
  emptyNumber: {
    width: NumberWidth,
    height: NumberWidth,
    marginBottom: PadSpacing / 2,
  },
  paddingLeft: {
    marginLeft: PadSpacing,
  },
})
