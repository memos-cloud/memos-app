import React from 'react'
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg'
import { useStoreState } from '../../@types/typedHooks'

export const PlayIcon = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox='0 0 91 91' fill='none'>
      <G clip-path='url(#clip0)'>
        <Path
          d='M19.3578 2.00648C11.1536 -2.69955 4.5022 1.15569 4.5022 10.6105V80.3829C4.5022 89.8471 11.1536 93.6973 19.3578 88.9958L80.3423 54.0216C88.5492 49.3139 88.5492 41.6867 80.3423 36.9801L19.3578 2.00648Z'
          fill={colors.white}
        />
      </G>
      <Defs>
        <ClipPath id='clip0'>
          <Rect width={size} height={size} fill={colors.white} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
