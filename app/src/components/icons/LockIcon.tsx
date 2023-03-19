import React from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'
import { useStoreState } from '../../state-management/typedHooks'

export const LockIcon = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox="0 0 38 38" fill="none">
      <G clip-path="url(#clip0)">
        <Path
          d="M29.6874 14.25H28.4999V9.5C28.4999 4.26075 24.2391 0 18.9999 0C13.7606 0 9.49988 4.26075 9.49988 9.5V14.25H8.31238C6.34904 14.25 4.74988 15.8476 4.74988 17.8125V34.4375C4.74988 36.4024 6.34904 38 8.31238 38H29.6874C31.6507 38 33.2499 36.4024 33.2499 34.4375V17.8125C33.2499 15.8476 31.6507 14.25 29.6874 14.25ZM12.6665 9.5C12.6665 6.00717 15.507 3.16667 18.9999 3.16667C22.4927 3.16667 25.3332 6.00717 25.3332 9.5V14.25H12.6665V9.5ZM20.5832 26.4765V30.0833C20.5832 30.9573 19.8755 31.6667 18.9999 31.6667C18.1243 31.6667 17.4165 30.9573 17.4165 30.0833V26.4765C16.4745 25.9271 15.8332 24.9169 15.8332 23.75C15.8332 22.0036 17.2535 20.5833 18.9999 20.5833C20.7463 20.5833 22.1665 22.0036 22.1665 23.75C22.1665 24.9169 21.5253 25.9271 20.5832 26.4765Z"
          fill={colors.white}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Rect
            width={size}
            height={size}
            fill={colors.white}
            transform="translate(-0.00012207)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
