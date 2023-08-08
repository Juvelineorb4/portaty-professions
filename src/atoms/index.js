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
export const userAuthenticated = atom({
  key: "userAuthenticatedValue",
  default: null,
});
export const userTable = atom({
  key: "userTableValue",
  default: null,
});
export const userProfile = atom({
  key: "userProfileValue",
  default: {},
});
export const businessProfile = atom({
  key: "businessProfileValue",
  default: {},
});

