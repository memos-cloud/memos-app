import React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { useStoreState } from '../../@types/typedHooks'

export const RemoveCharIcon = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <G clipPath="url(#clip0)">
        <Path
          d="M26.6908 24.9473H9.33668C9.16438 24.9473 9.00075 24.8755 8.88423 24.7503L0.207146 15.4534C-0.0159787 15.2154 -0.0159787 14.846 0.207146 14.6067L8.88423 5.30987C9.00075 5.18591 9.16438 5.11401 9.33668 5.11401H26.6908C28.4002 5.11401 29.7898 6.50483 29.7898 8.21297V21.8484C29.7898 23.5565 28.4002 24.9473 26.6908 24.9473Z"
          fill={colors.white}
        />
        <Path
          d="M23.5919 19.989C23.4332 19.989 23.2746 19.9282 23.1531 19.808L14.476 11.1309C14.2343 10.8892 14.2343 10.4963 14.476 10.2545C14.7177 10.0128 15.1107 10.0128 15.3524 10.2545L24.0295 18.9316C24.2712 19.1733 24.2712 19.5663 24.0295 19.808C23.9092 19.9282 23.7506 19.989 23.5919 19.989Z"
          fill={colors.black}
        />
        <Path
          d="M14.9148 19.989C14.7561 19.989 14.5975 19.9282 14.476 19.808C14.2343 19.5663 14.2343 19.1733 14.476 18.9316L23.1531 10.2545C23.3948 10.0128 23.7878 10.0128 24.0295 10.2545C24.2712 10.4963 24.2712 10.8892 24.0295 11.1309L15.3524 19.808C15.2321 19.9282 15.0735 19.989 14.9148 19.989Z"
          fill={colors.black}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect
            width={size}
            height={size}
            fill={colors.white}
            transform="translate(0.0398102 0.15564)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
