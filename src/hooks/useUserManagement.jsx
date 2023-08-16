import React from "react";
// amplify
import { Auth, API } from "aws-amplify";
import { userByEmail } from "@/graphql/CustomQueries/Navigation";
import { updateUsers } from "@/graphql/CustomMutations/Navigation";
// recpil
import { useRecoilState } from "recoil";
import { userAuthenticated, userTable } from "@/atoms/index";

import { useNavigation } from "@react-navigation/native";

const useUserManagement = () => {
  const navigation = useNavigation();

  const [userAuth, setUserAuth] = useRecoilState(userAuthenticated);

  const userSignIn = (data) => {
    setUserAuth(data);
    checkAttributes(data);
    navigation.navigate("Tabs_Navigation");
  };

  const userSignOut = () => {
    setUserAuth(null);
    navigation.navigate("Login_Welcome");
  };
  const checkUser = async () => {
    try {
      const data = await Auth.currentAuthenticatedUser();
      setUserAuth(data);
      checkAttributes(data);
      navigation.navigate("Tabs_Navigation");
    } catch (error) {
      const { message } = new Error(error);
      console.log("ERROR USER: ", message);
    }
  };

  const checkAttributes = (data) => {
    const { attributes } = data;
    if (
      !attributes["custom:identityID"] ||
      attributes["custom:identityID"] === ""
    )
      updateIdentityID(data);
    if (
      !attributes["custom:userTableID"] ||
      attributes["custom:userTableID"] === ""
    )
      updateUserTableID(data);
  };

  const updateIdentityID = async (data) => {
    const { attributes } = data;
    try {
      const { identityId } = await Auth.currentUserCredentials();
      await Auth.updateUserAttributes(data, {
        "custom:identityID": identityId,
      });
      await API.graphql({
        query: updateUsers,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          input: {
            id: attributes["custom:userTableID"],
            identityID: identityId,
          },
        },
      });
    } catch (error) {
      const { message } = new Error(error);
      console.log("ERROR AL ACTUALIZAR IDENTITY ID: ", message);
    }
  };
  const updateUserTableID = async (data) => {
    const { email } = data.attributes;
    try {
      const result = await API.graphql({
        query: userByEmail,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          email,
        },
      });
      await Auth.updateUserAttributes(data, {
        "custom:userTableID": result.data.userByEmail.items[0].id,
      });
    } catch (error) {
      const { message } = new Error(error);
      console.log("ERROR AL CATUALIZAR USER TABLE ID", message);
    }
  };

  return { checkUser, userSignIn, userSignOut };
};

export default useUserManagement;
