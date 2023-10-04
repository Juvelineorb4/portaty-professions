import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
// recoil
import { useSetRecoilState } from "recoil";
import { mapUser } from "@/atoms";
const useLocation = () => {
  const [location, setLocation] = useState(null);
  const setUserLocation = useSetRecoilState(mapUser);
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //   setErrorMsg("Permission to access location was denied");
      return;
    }
    let locationData = await Location.getCurrentPositionAsync({});
    setLocation(locationData.coords);
    setUserLocation(locationData.coords);
  };
  useEffect(() => {
    getLocation();
  }, []);

  return { location };
};

export default useLocation;
