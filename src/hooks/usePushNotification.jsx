import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { useSetRecoilState } from "recoil";
import { notificationToken, notificationResponse } from "@/atoms/index";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "aws-amplify";
import * as mutationsNavigation from "@/graphql/CustomMutations/Navigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
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
      console.log("status", existingStatus);
      console.log("status", finalStatus);

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        })
      ).data;
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

    const hasRegistered = await AsyncStorage.getItem("hasRegistered");
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
  const setNotificationResponse = useSetRecoilState(notificationResponse);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const checkAndRequestPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
      registerForPushNotificationsAsync().then((token) => {
        setExpoPushToken(token);
        setToken(token);
        console.log("token", token);
      });
    };

    checkAndRequestPermissions();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        setNotificationResponse(response.notification.request.content);
      });

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
