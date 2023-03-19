import React, { FC } from 'react'
import { RefreshControl } from 'react-native'
import { useStoreState } from '../state-management/typedHooks'

interface Props {
  refreshing: boolean
  onRefresh: () => void
}

export const RefreshControlComponent: FC<Props> = (data) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <RefreshControl
      {...data}
      colors={[colors.primary]}
      progressBackgroundColor={colors.secondary}
    />
  )
}
