import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { useStoreState } from '../../@types/typedHooks'

export const PINIcon = ({ size }: { size: number }) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <Svg width={size} height={size} viewBox="0 0 30 31" fill="none">
      <Path
        d="M5.86956 15.6878H0.652194C0.292011 15.6878 0 15.3959 0 15.0357C0 14.6755 0.292011 14.3835 0.652194 14.3835H5.86956C6.22974 14.3835 6.52176 14.6755 6.52176 15.0357C6.52176 15.3959 6.22974 15.6878 5.86956 15.6878Z"
        fill={colors.white}
      />
      <Path
        d="M1.95658 17.947C1.59639 17.947 1.30438 17.655 1.30444 17.2948C1.30444 17.1804 1.33459 17.0679 1.39181 16.9687L4.00046 12.4492C4.19367 12.1452 4.59677 12.0554 4.90071 12.2487C5.18673 12.4305 5.28584 12.8011 5.1287 13.1014L2.51999 17.6209C2.40376 17.8223 2.1891 17.9465 1.95658 17.947Z"
        fill={colors.white}
      />
      <Path
        d="M4.56517 17.947C4.33217 17.947 4.11689 17.8227 4.00041 17.6209L1.3917 13.1014C1.22472 12.7822 1.34811 12.3881 1.66726 12.2212C1.96753 12.0641 2.33811 12.1631 2.51994 12.4492L5.12865 16.9687C5.30877 17.2807 5.2019 17.6795 4.88996 17.8596C4.79085 17.9168 4.67835 17.947 4.56389 17.947H4.56517Z"
        fill={colors.white}
      />
      <Path
        d="M13.6956 15.6878H8.47824C8.11806 15.6878 7.82605 15.3958 7.82605 15.0356C7.82605 14.6754 8.11806 14.3834 8.47824 14.3834H13.6956C14.0558 14.3834 14.3478 14.6754 14.3478 15.0356C14.3478 15.3959 14.0558 15.6878 13.6956 15.6878Z"
        fill={colors.white}
      />
      <Path
        d="M9.78263 17.947C9.42244 17.947 9.13043 17.655 9.13049 17.2948C9.13049 17.1804 9.16064 17.0679 9.21786 16.9687L11.8265 12.4492C12.0197 12.1452 12.4228 12.0554 12.7268 12.2487C13.0128 12.4305 13.1118 12.801 12.9548 13.1014L10.346 17.6209C10.2298 17.8223 10.0151 17.9465 9.78263 17.947Z"
        fill={colors.white}
      />
      <Path
        d="M12.3912 17.947C12.1582 17.947 11.9429 17.8227 11.8265 17.6209L9.21775 13.1014C9.05077 12.7822 9.17416 12.3881 9.49332 12.2212C9.79358 12.0641 10.1642 12.1631 10.346 12.4492L12.9547 16.9687C13.1348 17.2807 13.028 17.6795 12.716 17.8596C12.6169 17.9168 12.5044 17.947 12.3899 17.947H12.3912Z"
        fill={colors.white}
      />
      <Path
        d="M21.5218 15.6878H16.3044C15.9442 15.6878 15.6522 15.3958 15.6522 15.0356C15.6522 14.6754 15.9442 14.3834 16.3044 14.3834H21.5218C21.882 14.3834 22.174 14.6754 22.174 15.0356C22.174 15.3959 21.882 15.6878 21.5218 15.6878Z"
        fill={colors.white}
      />
      <Path
        d="M17.6087 17.9469C17.2485 17.9469 16.9565 17.6549 16.9565 17.2947C16.9565 17.1803 16.9867 17.0678 17.0439 16.9687L19.6526 12.4491C19.8458 12.1451 20.2489 12.0554 20.5528 12.2486C20.8388 12.4304 20.9379 12.801 20.7808 13.1013L18.1721 17.6208C18.0559 17.8222 17.8412 17.9465 17.6087 17.9469Z"
        fill={colors.white}
      />
      <Path
        d="M20.2174 17.947C19.9844 17.947 19.7691 17.8227 19.6526 17.6209L17.0439 13.1014C16.8769 12.7822 17.0003 12.3881 17.3195 12.2212C17.6198 12.0641 17.9903 12.1631 18.1722 12.4492L20.7809 16.9687C20.961 17.2807 20.8541 17.6795 20.5422 17.8596C20.4431 17.9168 20.3306 17.947 20.2161 17.947H20.2174Z"
        fill={colors.white}
      />
      <Path
        d="M29.3478 15.6878H24.1305C23.7703 15.6878 23.4783 15.3958 23.4783 15.0356C23.4783 14.6754 23.7703 14.3834 24.1305 14.3834H29.3478C29.708 14.3834 30 14.6754 30 15.0356C30 15.3959 29.708 15.6878 29.3478 15.6878Z"
        fill={colors.white}
      />
      <Path
        d="M25.4348 17.947C25.0747 17.947 24.7827 17.655 24.7827 17.2948C24.7827 17.1804 24.8129 17.0679 24.8701 16.9687L27.4788 12.4492C27.672 12.1452 28.0751 12.0554 28.379 12.2487C28.665 12.4305 28.7641 12.801 28.607 13.1014L25.9983 17.6209C25.882 17.8223 25.6674 17.9465 25.4348 17.947Z"
        fill={colors.white}
      />
      <Path
        d="M28.0436 17.947C27.8106 17.947 27.5953 17.8227 27.4788 17.6209L24.8701 13.1014C24.7031 12.7822 24.8265 12.3881 25.1457 12.2212C25.4459 12.0641 25.8165 12.1631 25.9983 12.4492L28.6071 16.9687C28.7872 17.2807 28.6803 17.6795 28.3684 17.8596C28.2693 17.9168 28.1568 17.947 28.0423 17.947H28.0436Z"
        fill={colors.white}
      />
    </Svg>
  )
}