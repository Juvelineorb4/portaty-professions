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
      views: [
        "/analytics/events/views/last-30-days",
        "/analytics/events/views/last-12-months",
        "/analytics/events/views/gender-percentage",
        "/analytics/events/views/country-percentage",
        "/analytics/events/views/age-percentage",
      ],
      favorites: {
        add: [
          "/analytics/events/favorites/add/last-30-days",
          "/analytics/events/favorites/add/last-12-months",
          "/analytics/events/favorites/add/gender-percentage",
          "/analytics/events/favorites/add/country-percentage",
          "/analytics/events/favorites/add/age-percentage",
        ],
        remove: [
          "/analytics/events/favorites/remove/last-30-days",
          "/analytics/events/favorites/remove/last-12-months",
          "/analytics/events/favorites/remove/gender-percentage",
          "/analytics/events/favorites/remove/country-percentage",
          "/analytics/events/favorites/remove/age-percentage",
        ],
      },
    },
  },
};