import React, { FC } from 'react'
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { colors } from '../config/colors'
import hexToHSL from '../utils/hexToHsl'
import Ripple from 'react-native-material-ripple'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface TextProps {
  text: string
  color?: string
  size?: 'md' | 'lg'
  icon?: ImageSourcePropType
}

interface Props extends TextProps {
  onPress: () => any
  bg: string
  customStyles?: StyleProp<ViewStyle>
  btnStyles?: StyleProp<ViewStyle>
  disabled?: boolean
}

const TextComponent: FC<TextProps> = ({ color, text, size, icon }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {icon && <Image style={styles.icon} source={icon} />}
    <Text
      style={[
        {
          color: color ? color : 'white',
        },
        size === 'lg' ? styles.lgSize : styles.mdSize,
      ]}
    >
      {text}
    </Text>
  </View>
)

const MyButton: FC<Props> = ({
  text,
  onPress,
  bg,
  color,
  size,
  customStyles,
  icon,
  btnStyles,
  disabled,
}) => {
  const hslValue = hexToHSL(bg)

  return (
    <TouchableWithoutFeedback disabled={disabled} onPress={onPress}>
      <View style={[styles.parent, customStyles]}>
        <Ripple
          rippleDuration={600}
          rippleColor={hslValue}
          style={[styles.button, { backgroundColor: bg }, btnStyles]}
        >
          <TextComponent icon={icon} color={color} text={text} size={size} />
        </Ripple>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  parent: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  mdSize: {
    fontSize: 16,
  },
  lgSize: {
    fontSize: 19,
  },
})

export { MyButton }
