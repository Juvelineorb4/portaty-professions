import { MaterialIcons } from "@expo/vector-icons";
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
  default: "",
});
export const activitySelect = atom({
  key: "activitySelectValue",
  default: {},
});
export const areaSelect = atom({
  key: "areaSelectValue",
  default: {},
});
export const errorArea = atom({
  key: "errorAreaValue",
  default: false,
});
export const optionBussines = atom({
  key: "optionBussinesValue",
  default: {
    name: "Servicio/s",
    icon: <MaterialIcons name="home-repair-service" size={32} color="black" />,
    id: 0,
  },
});
export const mapBusiness = atom({
  key: "mapBusinessValue",
  default: {},
});
export const selectLocation = atom({
  key: "selectLocationValue",
  default: false,
});
export const emptyLocation = atom({
  key: "emptyLocationValue",
  default: true,
});
export const directionBusiness = atom({
  key: "directionBusinessValue",
  default: "",
});
export const directionBusinessOn = atom({
  key: "directionBusinessOnValue",
  default: {},
});
export const imageBusiness = atom({
  key: "imageBusinessValue",
  default: null,
});
export const blobBusiness = atom({
  key: "blobBusinessValue",
  default: null,
});
export const base64Business = atom({
  key: "base64BusinessValue",
  default: "",
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
  default: [],
});
export const businessProfile = atom({
  key: "businessProfileValue",
  default: [],
});
export const searchStatus = atom({
  key: "searchStatusValue",
  default: false,
});
export const searchCache = atom({
  key: "searchCacheValue",
  default: [],
});
export const kmRadio = atom({
  key: "kmRadioValue",
  default: 1,
});
export const totalSearch = atom({
  key: "totalSearchValue",
  default: 2,
});

export const profileState = atom({
  key: "profileStateValue",
  default: false,
});
export const favoritesState = atom({
  key: "favoritesStateValue",
  default: false,
});
export const filterState = atom({
  key: "filterStateValue",
  default: 0.01,
});

export const mapUser = atom({
  key: "mapUserValue",
  default: null,
});
export const favoriteSelection = atom({
  key: "favoriteSelectionValue",
  default: [],
});
export const inputFavoritesSearch = atom({
  key: "inputFavoritesSearchValue",
  default: "",
});
export const urlInitalShare = atom({
  key: "urlInitalShareValue",
  default: {},
});
/* Code */
export const codeFields = atom({
  key: "codeFieldsValue",
  default: "",
});

export const updateListFavorites = atom({
  key: "updateListFavoritesValue",
  default: false,
});

export const updateProfile = atom({
  key: "updateProfileValue",
  default: false,
});

export const activeSearch = atom({
  key: "activeSearchValue",
  default: true,
});

export const textInputSearch = atom({
  key: "textInputSearchValue",
  default: "",
});

export const sheduleType = atom({
  key: "sheduleTypeValue",
  default: "Abierto durante un horario especifico",
});
export const shedulePush = atom({
  key: "shedulePushValue",
  default: [
    {
      name: "Lunes",
      active: false,
      index: 0,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
    {
      name: "Martes",
      active: false,
      index: 1,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
    {
      name: "Miercoles",
      active: false,
      index: 2,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
    {
      name: "Jueves",
      active: false,
      index: 3,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
    {
      name: "Viernes",
      active: false,
      index: 4,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
    {
      name: "Sabado",
      active: false,
      index: 5,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
    {
      name: "Domingo",
      active: false,
      index: 6,
      hourStart: "08:00",
      hourEnd: "16:00",
    },
  ],
});
export const activeModalScreen = atom({
  key: "activeModalScreenValue",
  default: true,
});
export const stepOneParams = atom({
  key: "stepOneParamsValue",
  default: null,
});
export const stepCompleteParams = atom({
  key: "stepCompleteParamsValue",
  default: null,
});
export const notificationToken = atom({
  key: "notificationTokenValue",
  default: null,
});
