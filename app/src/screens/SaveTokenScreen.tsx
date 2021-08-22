import React, { FC, useEffect } from 'react'
import { AuthNavProps } from '../@types/NavProps'
import { useStoreActions } from '../@types/typedHooks'
import Container from '../components/Container'

const SaveTokenScreen: FC<AuthNavProps<'SaveToken'>> = ({
  route: { params },
}) => {
  const Login = useStoreActions((state) => state.Login)
  useEffect(() => {
    if (params && params.token) Login(params.token)
  }, [params])

  return <Container></Container>
}

export { SaveTokenScreen }
