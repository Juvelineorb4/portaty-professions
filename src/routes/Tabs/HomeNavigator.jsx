import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeader from "@/components/Header/HomeHeader";
import LeftHeader from "@/components/Header/LeftHeader";
import { useRecoilValue } from "recoil";
import { favoriteSelection } from "@/atoms";
import FavoriteHeader from "@/components/Header/FavoriteHeader";
import CustomQR from "@/components/CustomQR";
import CustomInteractions from "@/components/CustomInteractions";
import FavoritePage from "@/screens/Home/FavoritePage";
import FavoritesHome from "@/screens/Home/FavoritesHome";
import Home from "@/screens/Home/Home";
import CustomPromotions from "@/components/CustomPromotions";
import NotificationsPage from "@/components/NotificationsPage";

const HomeNavigator = ({ route, navigation }) => {
  const Stack = createNativeStackNavigator();
  const selections = useRecoilValue(favoriteSelection);
  return (
    <Stack.Navigator id="Home_Stack" initialRouteName={`FavoritesHome`}>
      <Stack.Screen
        name="FavoritesHome"
        initialParams={route?.params}
        options={{
          animation: "slide_from_right",
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
        {(props) => <FavoritesHome {...props} />}
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
        name="ViewQR"
        component={CustomQR}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="NotificationsPage"
        component={NotificationsPage}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="InteractionsFavorites"
        component={CustomInteractions}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="PromotionsHome"
        component={CustomPromotions}
        options={{
          animation: "slide_from_right",
          header: (props) => <LeftHeader {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
