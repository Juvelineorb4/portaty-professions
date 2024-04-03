import React, { useState, useEffect } from "react";
import * as Updates from "expo-updates";

const useCheckUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(null);
  const [updateDate, setUpdateDate] = useState("");
  useEffect(() => {
    async function checkForUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        console.log("RESULTADO DE BUSQUEDA DE ACTUALIZACION: ", update);
        setUpdateVersion(update?.manifest?.runtimeVersion);
        setUpdateDate(update?.manifest?.createdAt);
        setUpdateAvailable(update.isAvailable);
      } catch (error) {
        console.log("ERROR EN BUSCAR ACTUALIZACION: ", error.message);
        alert(`Error fetching latest Expo update: ${error.message}`);
      }
    }

    checkForUpdate();
  }, []);

  async function fetchUpdate() {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return { updateAvailable, fetchUpdate, updateVersion, updateDate };
};

export default useCheckUpdate;
