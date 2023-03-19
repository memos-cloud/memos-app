import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { useStoreState } from '../../state-management/typedHooks'

export const ArrowIcon = ({ width }: { width: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={width} height={width / 1.18} viewBox="0 0 19 16" fill="none">
      <Path
        d="M0.94741 7.23027C0.556886 7.6208 0.556886 8.25396 0.94741 8.64448L7.31137 15.0084C7.7019 15.399 8.33506 15.399 8.72558 15.0084C9.11611 14.6179 9.11611 13.9848 8.72558 13.5942L3.06873 7.93738L8.72558 2.28052C9.11611 1.89 9.11611 1.25683 8.72558 0.86631C8.33506 0.475786 7.7019 0.475786 7.31137 0.86631L0.94741 7.23027ZM17.1456 6.93738L1.65452 6.93738V8.93738L17.1456 8.93738V6.93738Z"
        fill={colors.white}
      />
    </Svg>
  )
}
