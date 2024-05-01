import React, { useState, useEffect } from "react";
import * as queries from "@/graphql/CustomQueries/AppVersion";
import Constants from "expo-constants";
import { Platform, Linking } from "react-native";
import { API } from "aws-amplify";
const useCheckAppVersion = () => {
  const localVersion = Constants.expoConfig.version;
  const localOS = Platform.OS?.toUpperCase();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(null);
  const [updateDate, setUpdateDate] = useState("");
  useEffect(() => {
    async function checkForUpdate() {
      try {
        console.log(localOS);
        const result = await API.graphql({
          query: queries.AppVersionByDate,
          authMode: "AWS_IAM",
          variables: {
            platform: localOS,
            sortDirection: "DESC",
            limit: 1,
          },
        });

        const data = result?.data?.AppVersionByDate?.items[0];
        const latestVersion = data?.latestVersion;
        const createdAt = data?.createdAt;
        if (localVersion !== latestVersion && latestVersion) {
          setUpdateAvailable(true);
          setUpdateVersion(latestVersion);
          setUpdateDate(createdAt.split("T")[0]);
        } else {
          setUpdateAvailable(false);
        }
      } catch (error) {
        console.log("ERROR EN BUSCAR ACTUALIZACION: ", error.errors);
      }
    }

    checkForUpdate();
  }, []);

  async function fetchUpdate() {
    try {
      switch (Platform.OS) {
        case "android":
          Linking.openURL(
            `https://play.google.com/store/apps/details?id=${Constants?.expoConfig?.android?.package}`
          );
          break;
        case "ios":
          alert(`Redirección a App Store no configurada.`);
          break;
        default:
          break;
      }
    } catch (error) {
      alert(`Error al momento de redireccionar a Store ${error}`);
    }
  }

  return { updateAvailable, fetchUpdate, updateVersion, updateDate };
};

export default useCheckAppVersion;
