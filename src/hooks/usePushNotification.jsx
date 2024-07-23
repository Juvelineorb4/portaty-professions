import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useSetRecoilState } from "recoil";
import { notificationToken } from "@/atoms/index";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: "default",
//     title: "Esto es pa divertirnos",
//     body: "PA DIVERTIRNOS PA DIVERTIRNOS",
//     data: { someData: "goes here" },
//   };

//   await fetch("https://exp.host/--/api/v2/push/send", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Accept-encoding": "gzip, deflate",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(message),
//   });
// }

async function registerForPushNotificationsAsync() {
  // Obtener el identificador único del dispositivo
  try {
    const deviceID = Device.osBuildId || Device.osInternalBuildId;
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
      console.log('hue', token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    // Verificar si ya se realizó la operación previamente
    const hasRegistered = await AsyncStorage.getItem("hasRegistered");
    console.log("hasRegistered", hasRegistered);
    if (hasRegistered !== "registered") {
      await API.graphql({
        query: mutationsNavigation.createDeviceNotificationToken,
        variables: {
          input: {
            deviceID: deviceID,
            notificationToken: token,
          },
        },
        authMode: "AWS_IAM",
      });
      // Guardar el indicador en AsyncStorage
      await AsyncStorage.setItem("hasRegistered", "registered");
    }

    return token;
  } catch (error) {
    console.log("ERROR TOKEN: ", error);
  }
}

const usePushNotification = () => {
  const [expoPushToken, setExpoPushToken] = useState(null);
  const [notification, setNotification] = useState(false);
  const setToken = useSetRecoilState(notificationToken);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      setToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return expoPushToken;
};

export default usePushNotification;
