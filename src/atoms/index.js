import { atom } from "recoil";

export const authSession = atom({
  key: "authSessionValue",
  default: false,
});