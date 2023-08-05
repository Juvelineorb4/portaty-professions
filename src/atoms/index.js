import { atom } from "recoil";

export const authSession = atom({
  key: "authSessionValue",
  default: false,
});
export const tagsList = atom({
  key: "tagsListValue",
  default: [],
});
export const activitySelect = atom({
  key: "activitySelectValue",
  default: {},
});