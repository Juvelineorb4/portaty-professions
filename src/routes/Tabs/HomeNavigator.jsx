import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeader from "@/components/Header/HomeHeader";
import Home from "@/screens/Home/Home";
import FavoritePage from "@/screens/Home/FavoritePage";
import LeftHeader from "@/components/Header/LeftHeader";
import { useRecoilValue } from "recoil";
import { favoriteSelection } from "@/atoms";
import FavoriteHeader from "@/components/Header/FavoriteHeader";
import SharePage from "@/screens/Home/SharePage";
import ShareListPage from "@/screens/Home/ShareListPage";

const HomeNavigator = ({ route, navigation }) => {
  const Stack = createNativeStackNavigator();
  const selections = useRecoilValue(favoriteSelection);
  console.log(selections.length);
  return (
    <Stack.Navigator id="Home_Stack" initialRouteName={`Home`}>
      <Stack.Screen
        name="Home"
        options={{
          header: (props) =>
            selections.length === 0 ? (
              <HomeHeader {...props} />
            ) : (
              <FavoriteHeader
                {...props}
                multiple={selections.length === 1 ? false : true}
              />
            ),
        }}
      >
        {(props) => <Home {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="FavoritePage"
        component={FavoritePage}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
      name="SharePage"
      component={SharePage}
      options={{
        animation: "slide_from_right",
        header: (props) => <LeftHeader {...props} />,
      }}
    />
    <Stack.Screen
        name="ShareListPage"
        component={ShareListPage}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
