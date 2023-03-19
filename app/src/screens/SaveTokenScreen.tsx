import React, { FC, useEffect } from 'react'
import { AuthNavProps } from '../@types/NavProps'
import { useStoreActions } from '../state-management/typedHooks'
import Container from '../components/Container'

const SaveTokenScreen: FC<AuthNavProps<'SaveToken'>> = ({
  route: { params },
}) => {
  const Login = useStoreActions((state) => state.Login)

  useEffect(() => {
    if (params && params.token) {
      const token = params.token
      const parsedToken = token.endsWith('#') ? token.slice(0, -1) : token
      Login(parsedToken)
    }
  }, [params])

  return <Container></Container>
}

export { SaveTokenScreen }
