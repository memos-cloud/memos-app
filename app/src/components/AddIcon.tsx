import React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { useStoreState } from '../@types/typedHooks'

export const AddIcon = ({ width }: { width: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={width} height={width} viewBox='0 0 21 21' fill='none'>
      <G clip-path='url(#clip0)'>
        <Path
          d='M2.43556 4.04289H0.435547V18.0429C0.435547 19.1479 1.33053 20.0429 2.43556 20.0429H16.4356V18.0429H2.43556V4.04289Z'
          fill={colors.white}
        />
        <Path
          d='M18.4356 0.0429077H6.43556C5.33058 0.0429077 4.43555 0.937891 4.43555 2.04292V14.0429C4.43555 15.1479 5.33053 16.0429 6.43556 16.0429H18.4356C19.5405 16.0429 20.4356 15.1479 20.4356 14.0429V2.04292C20.4356 0.937891 19.5405 0.0429077 18.4356 0.0429077ZM17.4356 9.0429H13.4356V13.0429H11.4356V9.0429H7.43559V7.04289H11.4356V3.04291H13.4356V7.04289H17.4356V9.0429Z'
          fill={colors.white}
        />
      </G>
      <Defs>
        <ClipPath id='clip0'>
          <Rect
            width='20'
            height='20'
            fill={colors.white}
            transform='translate(0.435547 0.0429077)'
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
