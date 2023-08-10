import { View, Text } from 'react-native'
import React from 'react'

const Post = ({router}) => {
    const { data } = route.params
  console.log(data)
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{data.text}</Text>
    </View>
  )
}

export default Post