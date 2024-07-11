import { api } from "@/utils/constants/api";
import * as Constants from "expo-constants";
import { Analytics } from "aws-amplify";
import * as Device from "expo-device";
const kinesisStreamName =
    Constants?.AppOwnership?.Expo === ""
        ? api.kinesis_firehose.dev
        : api.kinesis_firehose.prod;
const DEVICE_TYPE = ["UNKNOWN", "PHONE", "TABLET", "DESKTOP", "TV"];
export const registerEvent = (eventname, params) => {
    const deviceType = Device.deviceType;
    const osName = Device.osName;
    const osVersion = Device.osVersion;
    const brand = Device.brand;
    const model = Device.modelName;
    const language = Device.language;
    // Obtener el identificador único del dispositivo
    const deviceID = Device.osBuildId || Device.osInternalBuildId;
    if (!eventname) {
        console.log("ERROR EN EVENTO: ", "eventname no puede estar vacio");
        return;
    }
    Analytics.record(
        {
            data: { ...params, eventname, deviceType: DEVICE_TYPE[deviceType], osName, osVersion, brand, model, language, deviceID },
            streamName: kinesisStreamName,
        },
        "AWSKinesisFirehose"
    );
    console.log("EVENTO EJECUTADO: ", eventname)
};