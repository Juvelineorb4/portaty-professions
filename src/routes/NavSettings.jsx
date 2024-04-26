import { useEffect } from "react";
import { Hub, API } from "aws-amplify";
import { useUserManagement } from "@/hooks";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
// recoil
import { useSetRecoilState } from "recoil";
import { urlInitalShare } from "@/atoms";
import useDeepLinkInital from "@/hooks/useDeepLinkInital";
const NavSettings = ({ checkRender }) => {
  const setUrlInitialShare = useSetRecoilState(urlInitalShare);
  const { userSignIn, userSignOut, checkUser } = useUserManagement();
  const navigation = useNavigation();
  useDeepLinkInital(checkRender);
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          userSignIn(data);
          break;
        case "signOut":
          userSignOut();
          break;
        case "confirmSignUp":
          break;
        case "autoSignIn":
          break;
        case "updateUserAttributes":
          checkUser();
          break;
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
      console.log("A VER URL: ", queryParams?.id);
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

    const api = "api-opense";
    const path = "/api/complaints";
    const params = {
      headers: {},
      queryStringParameters: {},
    };
    API.get(api, path, params)
      .then((r) => console.log("PUES: ", r))
      .catch((e) => console.log("ERROR: ", e));
    return () => {
      unsubscribe;
    };
  }, []);
};

export default NavSettings;
