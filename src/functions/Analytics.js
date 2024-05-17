import { api } from "@/utils/constants/api";
import * as Constants from "expo-constants";
import { Analytics } from "aws-amplify";

const kinesisStreamName =
    Constants?.AppOwnership?.Expo === "expo"
        ? api.kinesis_firehose.dev
        : api.kinesis_firehose.prod;

export const registerEvent = (eventname, params) => {
    if (!eventname) {
        console.log("ERROR EN EVENTO: ", "eventname no puede estar vacio");
        return;
    }
    Analytics.record(
        {
            data: { ...params, eventname },
            streamName: kinesisStreamName,
        },
        "AWSKinesisFirehose"
    );
};