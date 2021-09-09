import React from 'react'
import Svg, { G, Defs, ClipPath, Rect, Path } from 'react-native-svg'
import { useStoreState } from '../../@types/typedHooks'

export const PaintIcon = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox='0 0 38 37' fill='none'>
      <G clip-path='url(#clip0)'>
        <Path
          d='M19.1312 0.27478C8.91502 0.27478 0.631165 8.33475 0.631165 18.2748C0.631165 28.2148 8.91502 36.2748 19.1312 36.2748C20.8373 36.2748 22.2145 34.9348 22.2145 33.2748C22.2145 32.4948 21.9165 31.7947 21.4128 31.2648C20.9298 30.7348 20.642 30.0448 20.642 29.2747C20.642 27.6147 22.0192 26.2747 23.7253 26.2747H27.3534C33.0267 26.2747 37.6312 21.7947 37.6312 16.2747C37.6312 7.43475 29.3473 0.27478 19.1312 0.27478ZM7.82564 18.2748C6.1195 18.2748 4.74231 16.9348 4.74231 15.2748C4.74231 13.6147 6.1195 12.2748 7.82564 12.2748C9.53178 12.2748 10.909 13.6147 10.909 15.2748C10.909 16.9348 9.53169 18.2748 7.82564 18.2748ZM13.9923 10.2748C12.2862 10.2748 10.909 8.93484 10.909 7.27481C10.909 5.61478 12.2862 4.27481 13.9923 4.27481C15.6985 4.27481 17.0756 5.61478 17.0756 7.27481C17.0756 8.93484 15.6984 10.2748 13.9923 10.2748ZM24.27 10.2748C22.5639 10.2748 21.1867 8.93484 21.1867 7.27481C21.1867 5.61478 22.5639 4.27481 24.27 4.27481C25.9762 4.27481 27.3534 5.61478 27.3534 7.27481C27.3534 8.93484 25.9762 10.2748 24.27 10.2748ZM30.4367 18.2748C28.7305 18.2748 27.3534 16.9348 27.3534 15.2748C27.3534 13.6147 28.7305 12.2748 30.4367 12.2748C32.1428 12.2748 33.52 13.6147 33.52 15.2748C33.52 16.9348 32.1428 18.2748 30.4367 18.2748Z'
          fill={colors.white}
        />
      </G>
      <Defs>
        <ClipPath id='clip0'>
          <Rect
            width='37'
            height='36'
            fill={colors.white}
            transform='translate(0.631165 0.27478)'
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}