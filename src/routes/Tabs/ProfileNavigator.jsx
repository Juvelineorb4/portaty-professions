import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LeftHeader from "@/components/Header/LeftHeader";
import ProfileHeader from "@/components/Header/ProfileHeader";
import Profile from "@/screens/Profile/Profile";
import Post from "@/screens/Profile/Post";
import Form from "@/screens/Profile/Form";
import Unprofile from "@/screens/Profile/Unprofile";

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={`Unprofile`}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ header: (props) => <ProfileHeader {...props} /> }}
      />
      <Stack.Screen
        name="Unprofile"
        component={Unprofile}
        options={{ header: (props) => <ProfileHeader {...props} /> }}
      />
      <Stack.Screen
        name="Form"
        component={Form}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
