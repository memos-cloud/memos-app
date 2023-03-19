import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useStoreState } from '../../state-management/typedHooks'

export const ThreeDots = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox="0 0 24 23" fill="none">
      <Path
        d="M11.6847 5.11115C13.0961 5.11115 14.2403 3.96698 14.2403 2.55558C14.2403 1.14417 13.0961 0 11.6847 0C10.2733 0 9.12915 1.14417 9.12915 2.55558C9.12915 3.96698 10.2733 5.11115 11.6847 5.11115Z"
        fill={colors.white}
        fill-opacity="0.5"
      />
      <Path
        d="M11.6847 14.0556C13.0961 14.0556 14.2403 12.9114 14.2403 11.5C14.2403 10.0886 13.0961 8.94443 11.6847 8.94443C10.2733 8.94443 9.12915 10.0886 9.12915 11.5C9.12915 12.9114 10.2733 14.0556 11.6847 14.0556Z"
        fill={colors.white}
        fill-opacity="0.5"
      />
      <Path
        d="M11.6847 23C13.0961 23 14.2403 21.8558 14.2403 20.4444C14.2403 19.033 13.0961 17.8889 11.6847 17.8889C10.2733 17.8889 9.12915 19.033 9.12915 20.4444C9.12915 21.8558 10.2733 23 11.6847 23Z"
        fill={colors.white}
        fill-opacity="0.5"
      />
    </Svg>
  )
}
