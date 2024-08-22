export const listUserNotifications = /* GraphQL */ `
  query ListUserNotifications(
    $filter: ModelUserNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        title
        message
        type
        data
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;