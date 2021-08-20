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
import hexToHSL from '../utils/hexToHsl'

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
}

const TextComponent: FC<TextProps> = ({ color, text, size, icon }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
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
}) => {
  const hslValue = hexToHSL(bg)

  if (Platform.OS === 'android') {
    return (
      <View style={[styles.parent, customStyles]}>
        <TouchableNativeFeedback onPress={onPress}>
          <View style={[styles.button, { backgroundColor: bg }]}>
            <TextComponent icon={icon} color={color} text={text} size={size} />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  } else {
    return (
      <View style={[styles.parent, customStyles]}>
        <TouchableHighlight
          underlayColor={hslValue}
          style={[styles.button, { backgroundColor: bg }]}
          onPress={onPress}
        >
          <TextComponent icon={icon} color={color} text={text} size={size} />
        </TouchableHighlight>
      </View>
    )
  }
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
    borderRadius: 10,
    padding: 16,
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
