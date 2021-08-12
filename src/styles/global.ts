import { StyleSheet } from 'react-native'
import { Fonts } from '../@types/fonts'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  titleText: {
    fontFamily: Fonts['Poppins-bold'],
    color: '#333',
    fontSize: 25,
  },
  paragraphText: {
    marginVertical: 8,
    lineHeight: 20,
  },
})
