import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useSearchParams } from 'expo-router'

const SeachDetail = () => {
  const { detail } = useSearchParams()
  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
      <Stack.Screen options={{ headerTitle: `Details #${detail}`}} />
      <Text>My search details is: {detail}</Text>
    </View>
  )
}

export default SeachDetail