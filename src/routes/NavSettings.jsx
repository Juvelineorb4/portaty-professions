import { useEffect } from "react";
import { Hub } from "aws-amplify";
import { useUserManagement } from "@/hooks";

const NavSettings = () => {
  const { userSignIn, userSignOut, checkUser } = useUserManagement();
  useEffect(() => {
    // crear subscripcion
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      console.log("HUB: ", event);
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
          break;
      }
    });
    checkUser();
    return unsubscribe;
  }, []);
};

export default NavSettings;
