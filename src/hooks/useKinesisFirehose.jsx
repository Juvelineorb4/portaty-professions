import React from "react";
import { api } from "@/utils/constants/api";
import * as Constants from "expo-constants";
const useKinesisFirehose = () => {
  const kinesisStreamName =
    Constants?.AppOwnership?.Expo === "expo"
      ? api.kinesis_firehose.dev
      : api.kinesis_firehose.prod;
  return [kinesisStreamName];
};

export default useKinesisFirehose;
