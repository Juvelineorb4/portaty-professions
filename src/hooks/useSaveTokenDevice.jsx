import React, { useEffect } from "react";
import * as Device from "expo-device";

const useSaveTokenDevice = () => {
  // Obtener el identificador único del dispositivo
  const deviceID = Device.osBuildId || Device.osInternalBuildId;
  useEffect(() => {
    console.log("DEVICE ID: ", deviceID);
  }, []);
};

export default useSaveTokenDevice;
