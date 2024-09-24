import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { saveUserLocation } from "@/functions/saveUserLocation"; // Asegúrate de que esta ruta sea correcta

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;

    if (locations && locations.length > 0) {
      const userLocation = locations[0]; // Tomamos la primera ubicación en la lista
      const { latitude, longitude } = userLocation.coords;

      // Dispara la función con la latitud y longitud
      saveUserLocation({
        lat: latitude,
        lon: longitude,
      });

      console.log("Ubicación actualizada:", { latitude, longitude });
    }
  }
});

const startLocationUpdates = async () => {
  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === "granted") {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000, // Tiempo en milisegundos entre actualizaciones
      distanceInterval: 1000, // Disparar solo cuando se haya movido al menos 1 km (1000 metros)
      showsBackgroundLocationIndicator: true, // Solo en iOS
    });
  }
};

export default startLocationUpdates;
