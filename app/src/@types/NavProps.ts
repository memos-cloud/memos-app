import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  AppStackParamList,
  Auth2StackParamList,
  AuthStackParamList,
  HomeTabsParamList,
} from './StackParamList'

export interface AuthNavProps<Screen extends keyof AuthStackParamList> {
  route: RouteProp<AuthStackParamList, Screen>
  navigation: StackNavigationProp<AuthStackParamList, Screen>
}
export interface Auth2NavProps<Screen extends keyof Auth2StackParamList> {
  route: RouteProp<Auth2StackParamList, Screen>
  navigation: StackNavigationProp<Auth2StackParamList, Screen>
}

export interface HomeNavProps<Screen extends keyof HomeTabsParamList> {
  route: RouteProp<HomeTabsParamList, Screen>
  navigation: StackNavigationProp<HomeTabsParamList, Screen>
}

export interface AppNavProps<Screen extends keyof AppStackParamList> {
  route: RouteProp<AppStackParamList, Screen>
  navigation: StackNavigationProp<AppStackParamList, Screen>
}
