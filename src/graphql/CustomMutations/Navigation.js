export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      cognitoID
      email
      identityID
    }
  }
`;

export const createDeviceNotificationToken = /* GraphQL */ `
  mutation CreateDeviceNotificationToken(
    $input: CreateDeviceNotificationTokenInput!
    $condition: ModelDeviceNotificationTokenConditionInput
  ) {
    createDeviceNotificationToken(input: $input, condition: $condition) {
      id
      deviceID
      notificationToken
      createdAt
      updatedAt
      __typename
    }
  }
`;