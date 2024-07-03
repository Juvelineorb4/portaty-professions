import React, { useEffect } from "react";
import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { isUserTracking } from "@/atoms";
import { useSetRecoilState } from "recoil";
export default function useUserTracking() {
  const setIsTracking = useSetRecoilState(isUserTracking);
  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === "granted") {
        console.log("Yay! I have user permission to track data");
        setIsTracking(true);
      } else {
        setIsTracking(false);
      }
    })();
  }, []);
}
