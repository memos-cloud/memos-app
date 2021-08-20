import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from './AuthStackParamList'

export interface NavProps<Screen extends keyof AuthStackParamList> {
  route: RouteProp<AuthStackParamList, Screen>
  navigation: StackNavigationProp<AuthStackParamList, Screen>
}
