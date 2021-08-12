import React from 'react'
import { Text, View } from 'react-native'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export function Playground() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
      (res) => res.json()
    )
  )

  if (isLoading) return <Text>Loading...</Text>

  if (error) return <Text>An error has occurred: {(error as any).message}</Text>

  return (
    <View>
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
      <Text>👀 {data.subscribers_count}</Text>
      <Text>✨ {data.stargazers_count}</Text>
      <Text>🍴 {data.forks_count}</Text>
    </View>
  )
}
