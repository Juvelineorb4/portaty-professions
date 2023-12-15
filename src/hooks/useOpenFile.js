import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
const useOpenFile = () => {
  // PANA ESTO LO COPIE DE INTERNET
  // https://stackoverflow.com/questions/59812941/view-or-open-pdf-files-stored-locally-expo-react-native
  // si se nos olvida pailas
  const openFile = (uri, contentType) => {
    FileSystem.getContentUriAsync(uri).then((cUri) => {
      if (Platform.OS === "ios") {
        Sharing.shareAsync(cUri);
      } else {
        console.log(cUri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
          type: contentType,
        }).catch((e) => console.log("ERROR AL ABRIR ARCHIVO: ", e));
      }
    });
  };

  const downloadFile = async (data, uri) => {
    try {
      const result = await FileSystem.downloadAsync(data, uri);
      return result?.uri;
    } catch (error) {
      return null;
    }
  };

  const downloadAndOpenFile = async (data, localUri, contentType) => {
    result = await downloadFile(data, localUri);
    openFile(result, contentType);
  };

  return { openFile, downloadFile, downloadAndOpenFile };
};

export default useOpenFile;
