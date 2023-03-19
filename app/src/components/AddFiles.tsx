import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useStoreState } from '../state-management/typedHooks'
import { AddIcon } from './icons/AddIcon'
import { MyText } from './MyText'

export const AddFiles = ({
  width,
  addFilesHandler,
}: {
  width: number
  addFilesHandler: any
}) => {
  const colors = useStoreState((state) => state.theme)

  return (
    <TouchableOpacity
      style={{
        width,
        height: width,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 7,
      }}
      onPress={addFilesHandler}
      activeOpacity={colors.activeOpacity}
    >
      <AddIcon width={22} />
      <MyText customStyles={{ marginTop: 3 }} size="2xs">
        add Files
      </MyText>
    </TouchableOpacity>
  )
}
