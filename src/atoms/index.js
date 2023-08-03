import { atom } from "recoil";

export const authSession = atom({
  key: "authSessionValue",
  default: false,
});

export const userAuthentication = atom({
  key: "userAuthenticationValue",
  default: null,
});
