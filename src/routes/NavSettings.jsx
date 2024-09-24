import { useEffect, useState } from "react";
import { Hub, API, Auth } from "aws-amplify";
import { useUserManagement } from "@/hooks";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
// recoil
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  urlInitalShare,
  notificationResponse,
  eyelashSelection,
  userAuthenticated,
  mapUser,
} from "@/atoms";
import useDeepLinkInital from "@/hooks/useDeepLinkInital";
// para guardar location al hacer sign In
import { saveUserLocation } from "@/functions/saveUserLocation";

const NavSettings = ({ checkRender }) => {
  const userAuth = useRecoilValue(userAuthenticated);
  const userLocation = useRecoilValue(mapUser);
  const setUrlInitialShare = useSetRecoilState(urlInitalShare);
  const { userSignIn, userSignOut, checkUser } = useUserManagement();
  const notificationRes = useRecoilValue(notificationResponse);
  const setPageSelection = useSetRecoilState(eyelashSelection);
  const [isSignIn, setIsSignIn] = useState(false);
  const navigation = useNavigation();
  useDeepLinkInital(checkRender);
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          userSignIn(data);
          setIsSignIn(true);
          break;
        case "signOut":
          userSignOut(data);
          break;
        case "confirmSignUp":
          break;
        case "autoSignIn":
          break;
        case "updateUserAttributes":
          checkUser();
          break;
        case "parsingCallbackUrl":
      }
    });

    const checkInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (!initialUrl) return;
      const { hostname, path, queryParams } = Linking.parse(initialUrl);

      if (initialUrl) {
        setUrlInitialShare({
          path,
          queryParams,
        });
      }
    };
    Linking.addEventListener("url", ({ url }) => {
      const { hostname, path, queryParams } = Linking.parse(url);
      if (url) {
        // if (path === "share/list" && queryParams?.id) {
        //   return navigation.navigate("ShareNavigator", {
        //     screen: "ShareListPage",
        //     params: { id: queryParams?.id },
        //   });
        // }
        if (path === "share/business" && queryParams?.id) {
          return navigation.navigate("ShareNavigator", {
            screen: "SharePage",
            params: { id: queryParams?.id },
          });
        }
      }
    });
    checkInitialUrl();
    checkUser();
    return () => {
      unsubscribe;
    };
  }, []);

  // useEffect para cuando se le de click a una notificacion
  useEffect(() => {
    switch (notificationRes?.data?.data?.type) {
      case "promotion":
        setPageSelection(0);
        navigation.navigate("Home_Tab", {
          promotion: true,
          promotionID: notificationRes?.data?.data?.promotionID,
        });
        console.log(notificationRes?.data);
        break;

      default:
        console.log("NO EXISTE ");
        break;
    }
  }, [notificationRes]);

  // useEffect para cuando location cambia
  useEffect(() => {
    if (userLocation && userAuth) {
      saveUserLocation({
        lat: userLocation.latitude,
        lon: userLocation.longitude,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && isSignIn) {
      console.log("VAMOS AGUARDAR LOCATION por signIN");
      saveUserLocation({
        lat: userLocation.latitude,
        lon: userLocation.longitude,
      });
      setIsSignIn(false);
    }
  }, [userLocation, isSignIn]);
};

export default NavSettings;
