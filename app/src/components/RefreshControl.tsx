import React, { FC } from 'react'
import { RefreshControl } from 'react-native'
import { colors } from '../config/colors'

interface Props {
  refreshing: boolean
  onRefresh: () => void
}

export const RefreshControlComponent: FC<Props> = (data) => (
  <RefreshControl
    {...data}
    colors={[colors.primary]}
    progressBackgroundColor={colors.secondary}
  />
)
