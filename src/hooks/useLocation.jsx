import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
// recoil
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { locationPermission, mapUser, userAuthenticated } from "@/atoms";
// funciones
import { saveUserLocation } from "@/functions/saveUserLocation";

const useLocation = () => {
  const userAuth = useRecoilValue(userAuthenticated);
  const [location, setLocation] = useState(null);
  const setUserLocation = useSetRecoilState(mapUser);
  const [locationStatus, setLocationStatus] =
    useRecoilState(locationPermission);

  useEffect(() => {
    let subscription;

    const startLocationUpdates = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLocationStatus(status);
          return;
        }
        setLocationStatus(status);
        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 100, // Actualiza cada 100 metros
            mayShowUserSettingsDialog: true,
          },
          (locationResult) => {
            const { latitude, longitude } = locationResult.coords;
            setLocation({ latitude, longitude });
            setUserLocation({ latitude, longitude });
          }
        );
      } catch (err) {
        // setError("Error al obtener la ubicación");
      }
    };

    startLocationUpdates();

    return () => {
      // Limpia la suscripción cuando el componente se desmonta
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (location && userAuth) {
      saveUserLocation(userAuth, {
        lat: location.latitude,
        lon: location.longitude,
      });
    }
  }, [location]);

  return { location };
};

export default useLocation;
