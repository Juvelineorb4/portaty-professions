import { Text, View } from "react-native";
import React from "react";
import PromotionsHome from "./PromotionsHome";
import { useRecoilValue } from "recoil";
import { eyelashSelection } from "@/atoms";
import FavoritesHome from "./FavoritesHome";

const Home = ({navigation}) => {
  const pageSelection = useRecoilValue(eyelashSelection);
  if (pageSelection === 1) {
    return <FavoritesHome />;
  } else {
    return <PromotionsHome />;
  }
};

export default Home;