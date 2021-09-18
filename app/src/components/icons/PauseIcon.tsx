import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useStoreState } from '../../@types/typedHooks'

export const PauseIcon = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox='0 0 91 91' fill='none'>
      <Path
        d='M34.3895 78.325C34.3895 85.3248 28.7143 91 21.7145 91C14.7146 91 9.03943 85.3248 9.03943 78.325V12.675C9.03943 5.6752 14.7146 0 21.7145 0C28.7143 0 34.3895 5.6752 34.3895 12.675V78.325Z'
        fill={colors.white}
      />
      <Path
        d='M81.9587 78.325C81.9587 85.3248 76.2835 91 69.2837 91C62.2838 91 56.6086 85.3248 56.6086 78.325V12.675C56.6106 5.6752 62.2857 0 69.2837 0C76.2835 0 81.9587 5.6752 81.9587 12.675V78.325Z'
        fill={colors.white}
      />
    </Svg>
  )
}
