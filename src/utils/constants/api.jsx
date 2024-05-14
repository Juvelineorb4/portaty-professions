export const api = {
  stage_endpoint: {
    dev: "https://x0nk2m8hvi.execute-api.us-east-1.amazonaws.com/dev",
    prod: "https://z5i64n32d6.execute-api.us-east-1.amazonaws.com/prod",
  },
  kinesis_firehose: {
    dev: "portaty-dev-stream",
    prod: "portaty-prod-stream",
  },
  rediret_signin: {
    dev: "exp://192.168.100.4:8081/",
    prod: "",
  },
  rediret_signout: {
    dev: "exp://192.168.100.4:8081/",
    prod: "",
  },
  paths: {
    analytics: {
      views: {
        last30days: "/analytics/events/views/last-30-days",
        last12moths: "/analytics/events/views/last-12-months",
        genderPercentage: "/analytics/events/views/gender-percentage",
        countryPercentage: "/analytics/events/views/country-percentage",
        agePercentage: "/analytics/events/views/age-percentage",
      },
    },
  },
};
