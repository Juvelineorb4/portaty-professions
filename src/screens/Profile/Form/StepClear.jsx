import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import { useRecoilState } from "recoil";
import {
  activeModalScreen,
  activitySelect,
  areaSelect,
  base64Business,
  blobBusiness,
  directionBusiness,
  directionBusinessOn,
  emptyLocation,
  imageBusiness,
  mapBusiness,
  optionBussines,
  profileState,
  selectLocation,
} from "@/atoms";
import { MaterialIcons } from "@expo/vector-icons";

const StepClear = ({ navig, complete = false }) => {
  const [map, setMap] = useRecoilState(mapBusiness);
  const [direction, setDirection] = useRecoilState(directionBusinessOn);
  const [image, setImage] = useRecoilState(imageBusiness);
  const [blobImage, setBlobImage] = useRecoilState(blobBusiness);
  const [imageB64, setImageB64] = useRecoilState(base64Business);
  const [area, setArea] = useRecoilState(areaSelect);
  const [activity, setActivity] = useRecoilState(activitySelect);
  const [location, setLocation] = useRecoilState(selectLocation);
  const [locationEmpty, setLocationEmpty] = useRecoilState(emptyLocation);
  const [locationDirection, setLocationDirection] =
    useRecoilState(directionBusiness);
  const [active, setActive] = useRecoilState(activeModalScreen);
  const [selectOption, setSelectOption] = useRecoilState(optionBussines);
  const [stateProfile, setStateProfile] = useRecoilState(profileState);

  const BlankInputs = () => {
    setStateProfile(!stateProfile)
    setDirection({});
    setMap({});
    setImage(null);
    setBlobImage(null);
    setImageB64("");
    setArea({});
    setActivity({});
    setLocationDirection("");
    setLocationEmpty(true);
    setLocation(false);
    setSelectOption({
      name: "Servicio/s",
      icon: (
        <MaterialIcons name="home-repair-service" size={32} color="black" />
      ),
      id: 0,
    });
  };
  return (
    <View>
      {complete ? (
      

        <Pressable
          style={[
            global.bgYellow,
            {
              flex: 1,
              borderWidth: 1,
              width: 300,
              height: 80,
              borderRadius: 8,
              alignSelf: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            },
          ]}
          onPress={() => {
            navig();
            BlankInputs();
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                {
                  fontFamily: "bold",
                  fontSize: 18,
                  color: "#1f1f1f",
                },
              ]}
            >
              Ir a tu perfil
            </Text>
          </View>
        </Pressable>

      ) : (
        <Pressable
          onPress={() => {
            navig();
            BlankInputs();
          }}
        >
          <Image
            style={{
              width: 55,
              height: 55,
              resizeMode: "contain",
            }}
            source={require("@/utils/images/arrow_back.png")}
          />
        </Pressable>
      )}
    </View>
  );
};

export default StepClear;
