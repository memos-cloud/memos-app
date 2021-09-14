import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  AppStackParamList,
  AuthStackParamList,
  HomeStackParamList,
} from './StackParamList'

export interface AuthNavProps<Screen extends keyof AuthStackParamList> {
  route: RouteProp<AuthStackParamList, Screen>
  navigation: StackNavigationProp<AuthStackParamList, Screen>
}

export interface AppNavProps<Screen extends keyof AppStackParamList> {
  route: RouteProp<AppStackParamList, Screen>
  navigation: StackNavigationProp<AppStackParamList, Screen>
}

export interface HomeNavProps<Screen extends keyof HomeStackParamList> {
  route: RouteProp<HomeStackParamList, Screen>
  navigation: StackNavigationProp<HomeStackParamList, Screen>
}
