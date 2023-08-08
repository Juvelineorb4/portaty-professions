import { atom } from "recoil";

export const authSession = atom({
  key: "authSessionValue",
  default: false,
});
export const tagsList = atom({
  key: "tagsListValue",
  default: [],
});
export const keyImage = atom({
  key: "keyImageValue",
  default: '',
});
export const activitySelect = atom({
  key: "activitySelectValue",
  default: {},
});
export const userProfile = atom({
  key: "userProfileValue",
  default: {},
});
export const businessProfile = atom({
  key: "businessProfileValue",
  default: {},
});