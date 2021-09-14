import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { useStoreState } from '../../@types/typedHooks'

export const SettingsOutlineIcon = () => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width='26' height='26' viewBox='0 0 50 50' fill='none'>
      <Path
        d='M27.3333 50H22.6667C21.0896 50 19.7583 48.8187 19.5708 47.25L19.0729 43.3417C18.0792 43.0188 17.1208 42.6208 16.2104 42.1562L13.0979 44.575C11.8354 45.5521 10.0583 45.4396 8.9625 44.3125L5.68125 41.0312C4.5625 39.9458 4.45 38.1687 5.42708 36.9083L7.84583 33.7938C7.37917 32.8833 6.98125 31.925 6.66042 30.9312L2.74375 30.4333C1.18125 30.2417 0 28.9104 0 27.3333V22.6667C0 21.0896 1.18125 19.7583 2.75 19.5708L6.65833 19.0729C6.98125 18.0792 7.37917 17.1208 7.84375 16.2104L5.42708 13.0979C4.44792 11.8354 4.5625 10.0562 5.69167 8.96042L8.97292 5.67917C10.0583 4.56042 11.8375 4.45 13.0958 5.425L16.2083 7.84583C17.1187 7.38125 18.0771 6.98333 19.0729 6.66042L19.5708 2.74375C19.7583 1.18125 21.0896 0 22.6667 0H27.3333C28.9104 0 30.2417 1.18125 30.4292 2.75L30.9271 6.65833C31.9229 6.98125 32.8812 7.37917 33.7917 7.84375L36.9042 5.425C38.1687 4.44792 39.9437 4.56042 41.0396 5.68958L44.3208 8.97083C45.4396 10.0563 45.5521 11.8333 44.575 13.0937L42.1562 16.2083C42.6229 17.1187 43.0208 18.0771 43.3417 19.0708L47.2583 19.5687C48.8187 19.7583 50 21.0896 50 22.6667V27.3333C50 28.9104 48.8187 30.2417 47.25 30.4292L43.3417 30.9271C43.0188 31.9208 42.6208 32.8792 42.1562 33.7896L44.575 36.9021C45.5542 38.1646 45.4396 39.9417 44.3104 41.0375L41.0292 44.3187C39.9437 45.4375 38.1646 45.5521 36.9062 44.5729L33.7917 42.1542C32.8812 42.6208 31.9229 43.0187 30.9292 43.3396L30.4312 47.2562C30.2417 48.8187 28.9104 50 27.3333 50V50ZM16.1042 39.875C16.2771 39.875 16.4542 39.9187 16.6125 40.0062C17.7604 40.6479 19.0042 41.1646 20.3083 41.5396C20.7083 41.6542 21.0021 41.9958 21.0542 42.4083L21.6375 46.9917C21.7 47.5146 22.1521 47.9167 22.6667 47.9167H27.3333C27.8479 47.9167 28.3 47.5146 28.3604 47.0021L28.9458 42.4104C28.9979 41.9979 29.2917 41.6562 29.6917 41.5417C30.9958 41.1667 32.2396 40.65 33.3875 40.0083C33.7521 39.8042 34.2062 39.8396 34.5333 40.0958L38.1792 42.9292C38.5979 43.2542 39.1854 43.2271 39.5438 42.8583L42.8458 39.5562C43.2229 39.1896 43.2521 38.6021 42.9271 38.1812L40.0938 34.5354C39.8375 34.2062 39.8021 33.7542 40.0062 33.3896C40.6479 32.2417 41.1646 30.9979 41.5396 29.6937C41.6542 29.2937 41.9958 29 42.4083 28.9479L46.9917 28.3646C47.5146 28.3 47.9167 27.8479 47.9167 27.3333V22.6667C47.9167 22.1521 47.5146 21.7 47.0021 21.6396L42.4104 21.0542C41.9979 21.0021 41.6562 20.7083 41.5417 20.3083C41.1667 19.0042 40.65 17.7604 40.0083 16.6125C39.8042 16.2479 39.8375 15.7958 40.0958 15.4667L42.9292 11.8208C43.2563 11.4 43.2271 10.8125 42.8604 10.4583L39.5583 7.15625C39.1938 6.77708 38.6042 6.74792 38.1833 7.075L34.5375 9.90833C34.2062 10.1646 33.7542 10.2 33.3896 9.99583C32.2458 9.35417 31.0021 8.83958 29.6937 8.4625C29.2937 8.34792 29 8.00625 28.9479 7.59375L28.3646 3.01042C28.3 2.48542 27.8479 2.08333 27.3333 2.08333H22.6667C22.1521 2.08333 21.7 2.48542 21.6396 2.99792L21.0542 7.58958C21.0021 8.00208 20.7083 8.34375 20.3083 8.46042C19 8.83542 17.7562 9.35208 16.6125 9.99167C16.2479 10.1979 15.7958 10.1604 15.4646 9.90625L11.8187 7.07292C11.3979 6.74583 10.8125 6.775 10.4562 7.14167L7.15417 10.4458C6.77708 10.8125 6.74792 11.4 7.07292 11.8208L9.90625 15.4667C10.1625 15.7958 10.1979 16.2479 9.99375 16.6125C9.35 17.7604 8.83542 19.0042 8.46042 20.3083C8.34583 20.7083 8.00417 21.0021 7.59167 21.0542L3.00833 21.6375C2.48542 21.7 2.08333 22.1521 2.08333 22.6667V27.3333C2.08333 27.8479 2.48542 28.3 2.99792 28.3604L7.58958 28.9458C8.00208 28.9979 8.34375 29.2917 8.45833 29.6917C8.83333 30.9958 9.35 32.2396 9.99167 33.3875C10.1958 33.7521 10.1625 34.2042 9.90417 34.5333L7.07083 38.1792C6.74375 38.6 6.77292 39.1875 7.13958 39.5417L10.4417 42.8437C10.8062 43.2208 11.3917 43.25 11.8167 42.925L15.4625 40.0917C15.6521 39.95 15.8771 39.875 16.1042 39.875V39.875Z'
        fill={colors.white}
      />
      <Path
        d='M25 35.4166C19.2562 35.4166 14.5833 30.7437 14.5833 25C14.5833 19.2562 19.2562 14.5833 25 14.5833C30.7437 14.5833 35.4166 19.2562 35.4166 25C35.4166 30.7437 30.7437 35.4166 25 35.4166ZM25 16.6666C20.4041 16.6666 16.6666 20.4041 16.6666 25C16.6666 29.5958 20.4041 33.3333 25 33.3333C29.5958 33.3333 33.3333 29.5958 33.3333 25C33.3333 20.4041 29.5958 16.6666 25 16.6666Z'
        fill={colors.white}
      />
    </Svg>
  )
}
