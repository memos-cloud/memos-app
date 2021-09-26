import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export const DropDownArrow = ({
  width,
  fill,
  style,
}: {
  width: number
  fill: string
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <Svg
      style={style}
      width={width}
      height={width / 1.6}
      viewBox="0 0 23 14"
      fill="none"
    >
      <Path
        d="M9.99659 12.662C10.5824 13.2477 11.5321 13.2477 12.1179 12.662L21.6639 3.11602C22.2496 2.53023 22.2496 1.58049 21.6639 0.994701C21.0781 0.408914 20.1283 0.408914 19.5425 0.994701L11.0573 9.47998L2.57197 0.994701C1.98618 0.408915 1.03644 0.408915 0.450649 0.994701C-0.135137 1.58049 -0.135137 2.53023 0.450649 3.11602L9.99659 12.662ZM9.55725 9.74426L9.55725 11.6013L12.5573 11.6013L12.5573 9.74426L9.55725 9.74426Z"
        fill={fill}
      />
    </Svg>
  )
}
