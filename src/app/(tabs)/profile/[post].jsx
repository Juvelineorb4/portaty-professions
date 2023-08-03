import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const Post = () => {
  const params = useLocalSearchParams()
  console.log(params.data)
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Stack.Screen options={{ headerTitle: `Details #${params.post}`}} />
      <Text>My post is: {params.post}</Text>
    </View>
  )
}

export default Post