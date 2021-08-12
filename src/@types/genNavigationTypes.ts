import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from './RootStackParamList'

export interface NavProps<Screen extends keyof RootStackParamList> {
  route: RouteProp<RootStackParamList, Screen>
  navigation: StackNavigationProp<RootStackParamList, Screen>
}
