export const deleteUserNotification = /* GraphQL */ `
  mutation DeleteUserNotification(
    $input: DeleteUserNotificationInput!
    $condition: ModelUserNotificationConditionInput
  ) {
    deleteUserNotification(input: $input, condition: $condition) {
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
  }
`;