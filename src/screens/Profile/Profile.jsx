import { View, Text } from 'react-native'
import React from 'react'
import styles from "@/utils/styles/Profile.module.css";

const Profile = ({route}) => {
    const {user} = route.params
  return (
    <View>
      <Text>Profile</Text>
    </View>
  )
}

export default Profile