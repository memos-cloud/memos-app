import React, { memo, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { v4 as uuidv4 } from 'uuid'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import { LockIcon } from '../components/icons/LockIcon'
import { RemoveCharIcon } from '../components/icons/RemoveCharIcon'
import { MyText } from '../components/MyText'
import * as SecureStore from 'expo-secure-store'
import { Center } from '../components/Center'
import Container from '../components/Container'

type state = 'Setup' | 'Confirm' | 'Enter'

const { width } = Dimensions.get('window')

const DotsNum = 4
const DotWidth = 18
const PadSpacing = 13
const NumberWidth = width / 4 - PadSpacing / 2
const Pads = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, 'delete']
const dotsArray = new Array(DotsNum).fill(0)

export const PINCodeScreen = () => {
  const colors = useStoreState((state) => state.theme)
  const authenticate = useStoreActions((state) => state.authenticate)
  const [PINCode, setPINCode] = useState('')
  const [ConfirmPINCode, setConfirmPINCode] = useState('')
  const [state, setState] = useState<state>('Setup')
  const [savedPINCode, setSavedPINCode] = useState<string | null | undefined>(
    undefined,
  )

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
          authenticate()
        } else {
          // Show a more beatiful error message instead
          alert('WRONG PIN')
          setPINCode('')
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
          // Show a more beatiful error message instead
          alert("Confirm PIN doesn't match")

          setConfirmPINCode('')
        }
      }
    }

    checkIfMatches()
  }, [ConfirmPINCode])

  const OnNumPressHandler = (item: string | number) => {
    const code = state === 'Confirm' ? ConfirmPINCode : PINCode
    const setCode = state === 'Confirm' ? setConfirmPINCode : setPINCode

    if (item !== 'delete' && code.length < 4) {
      setCode(code + item)
    } else if (item === 'delete' && code.length) {
      const editedPINCode = code.slice(0, -1)
      setCode(editedPINCode)
    }
  }

  const NumberRenderItem = memo(
    ({ item, index }: ListRenderItemInfo<string | number>) => {
      return item === -1 ? (
        <View
          style={[
            styles.emptyNumber,
            index % 3 !== 0 ? styles.paddingLeft : {},
          ]}
        />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => OnNumPressHandler(item)}
          style={[styles.number, index % 3 !== 0 ? styles.paddingLeft : {}]}
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
        </TouchableWithoutFeedback>
      )
    },
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.black }}>
      {savedPINCode !== undefined && (
        <View style={styles.parent}>
          <View style={{ alignItems: 'center' }}>
            <LockIcon size={28} />
            <MyText customStyles={styles.title}>{state} PIN Code</MyText>
            <View style={styles.dots}>
              {dotsArray.map((e, i) => (
                <View key={uuidv4()} style={[styles.dot]}>
                  {i + 1 <=
                    (state === 'Confirm' ? ConfirmPINCode : PINCode).length && (
                    <View style={styles.active} />
                  )}
                </View>
              ))}
            </View>
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
    marginTop: 18,
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
    marginBottom: PadSpacing,
  },
  emptyNumber: {
    width: NumberWidth,
    height: NumberWidth,
    marginBottom: PadSpacing,
  },
  paddingLeft: {
    marginLeft: PadSpacing,
  },
})
