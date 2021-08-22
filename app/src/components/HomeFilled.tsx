import React from 'react'
import { Svg, G, Path, Defs, ClipPath } from 'react-native-svg'
import { colors } from '../config/colors'

export const HomeFilledIcon = () => (
  <Svg width='25' height='25' fill='none' viewBox='0 0 34 33'>
    <G clipPath='url(#clip0)'>
      <Path
        fill={colors.primary}
        d='M32.166 14.353l-.002-.002L18.702.891A3.017 3.017 0 0016.555 0c-.811 0-1.574.316-2.148.89L.952 14.344l-.014.014a3.042 3.042 0 00.006 4.29 3.02 3.02 0 002.11.89h.536v9.907A3.56 3.56 0 007.146 33h5.266a.967.967 0 00.967-.967v-7.766c0-.895.728-1.623 1.622-1.623h3.107c.894 0 1.622.728 1.622 1.623v7.766c0 .534.433.967.966.967h5.267a3.56 3.56 0 003.556-3.555v-9.907h.497a3.02 3.02 0 002.149-.89 3.043 3.043 0 00.001-4.295z'
      ></Path>
    </G>
    <Defs>
      <ClipPath id='clip0'>
        <Path
          fill={colors.primary}
          d='M0 0H33V33H0z'
          transform='translate(.056)'
        ></Path>
      </ClipPath>
    </Defs>
  </Svg>
)
