/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTags = /* GraphQL */ `
  mutation CreateTags(
    $input: CreateTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    createTags(input: $input, condition: $condition) {
      id
      name
      objects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTags = /* GraphQL */ `
  mutation UpdateTags(
    $input: UpdateTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    updateTags(input: $input, condition: $condition) {
      id
      name
      objects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTags = /* GraphQL */ `
  mutation DeleteTags(
    $input: DeleteTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    deleteTags(input: $input, condition: $condition) {
      id
      name
      objects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
      id
      name
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
      id
      name
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
      id
      name
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createActivityTags = /* GraphQL */ `
  mutation CreateActivityTags(
    $input: CreateActivityTagsInput!
    $condition: ModelActivityTagsConditionInput
  ) {
    createActivityTags(input: $input, condition: $condition) {
      id
      tagsId
      activityId
      tags {
        id
        name
        createdAt
        updatedAt
      }
      activity {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateActivityTags = /* GraphQL */ `
  mutation UpdateActivityTags(
    $input: UpdateActivityTagsInput!
    $condition: ModelActivityTagsConditionInput
  ) {
    updateActivityTags(input: $input, condition: $condition) {
      id
      tagsId
      activityId
      tags {
        id
        name
        createdAt
        updatedAt
      }
      activity {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivityTags = /* GraphQL */ `
  mutation DeleteActivityTags(
    $input: DeleteActivityTagsInput!
    $condition: ModelActivityTagsConditionInput
  ) {
    deleteActivityTags(input: $input, condition: $condition) {
      id
      tagsId
      activityId
      tags {
        id
        name
        createdAt
        updatedAt
      }
      activity {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      cognitoID
      name
      lastName
      email
      identityID
      favorites {
        nextToken
      }
      business {
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
      cognitoID
      name
      lastName
      email
      identityID
      favorites {
        nextToken
      }
      business {
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
      id
      cognitoID
      name
      lastName
      email
      identityID
      favorites {
        nextToken
      }
      business {
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createBusiness = /* GraphQL */ `
  mutation CreateBusiness(
    $input: CreateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    createBusiness(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        owner
        createdAt
        updatedAt
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates {
        lat
        lon
      }
      activity
      tags
      favorites {
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateBusiness = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        owner
        createdAt
        updatedAt
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates {
        lat
        lon
      }
      activity
      tags
      favorites {
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteBusiness = /* GraphQL */ `
  mutation DeleteBusiness(
    $input: DeleteBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    deleteBusiness(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        owner
        createdAt
        updatedAt
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates {
        lat
        lon
      }
      activity
      tags
      favorites {
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createFavorites = /* GraphQL */ `
  mutation CreateFavorites(
    $input: CreateFavoritesInput!
    $condition: ModelFavoritesConditionInput
  ) {
    createFavorites(input: $input, condition: $condition) {
      id
      businessID
      business {
        id
        userID
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        owner
        createdAt
        updatedAt
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        owner
        createdAt
        updatedAt
      }
      position
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateFavorites = /* GraphQL */ `
  mutation UpdateFavorites(
    $input: UpdateFavoritesInput!
    $condition: ModelFavoritesConditionInput
  ) {
    updateFavorites(input: $input, condition: $condition) {
      id
      businessID
      business {
        id
        userID
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        owner
        createdAt
        updatedAt
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        owner
        createdAt
        updatedAt
      }
      position
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteFavorites = /* GraphQL */ `
  mutation DeleteFavorites(
    $input: DeleteFavoritesInput!
    $condition: ModelFavoritesConditionInput
  ) {
    deleteFavorites(input: $input, condition: $condition) {
      id
      businessID
      business {
        id
        userID
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        owner
        createdAt
        updatedAt
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        owner
        createdAt
        updatedAt
      }
      position
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createComplaints = /* GraphQL */ `
  mutation CreateComplaints(
    $input: CreateComplaintsInput!
    $condition: ModelComplaintsConditionInput
  ) {
    createComplaints(input: $input, condition: $condition) {
      id
      userID
      businessID
      description
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateComplaints = /* GraphQL */ `
  mutation UpdateComplaints(
    $input: UpdateComplaintsInput!
    $condition: ModelComplaintsConditionInput
  ) {
    updateComplaints(input: $input, condition: $condition) {
      id
      userID
      businessID
      description
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteComplaints = /* GraphQL */ `
  mutation DeleteComplaints(
    $input: DeleteComplaintsInput!
    $condition: ModelComplaintsConditionInput
  ) {
    deleteComplaints(input: $input, condition: $condition) {
      id
      userID
      businessID
      description
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createLogs = /* GraphQL */ `
  mutation CreateLogs(
    $input: CreateLogsInput!
    $condition: ModelLogsConditionInput
  ) {
    createLogs(input: $input, condition: $condition) {
      id
      userID
      type
      text
      businessID
      posI
      posE
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateLogs = /* GraphQL */ `
  mutation UpdateLogs(
    $input: UpdateLogsInput!
    $condition: ModelLogsConditionInput
  ) {
    updateLogs(input: $input, condition: $condition) {
      id
      userID
      type
      text
      businessID
      posI
      posE
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteLogs = /* GraphQL */ `
  mutation DeleteLogs(
    $input: DeleteLogsInput!
    $condition: ModelLogsConditionInput
  ) {
    deleteLogs(input: $input, condition: $condition) {
      id
      userID
      type
      text
      businessID
      posI
      posE
      name
      createdAt
      updatedAt
    }
  }
`;
export const createTesting = /* GraphQL */ `
  mutation CreateTesting(
    $input: CreateTestingInput!
    $condition: ModelTestingConditionInput
  ) {
    createTesting(input: $input, condition: $condition) {
      id
      name
      coordinates {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTesting = /* GraphQL */ `
  mutation UpdateTesting(
    $input: UpdateTestingInput!
    $condition: ModelTestingConditionInput
  ) {
    updateTesting(input: $input, condition: $condition) {
      id
      name
      coordinates {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTesting = /* GraphQL */ `
  mutation DeleteTesting(
    $input: DeleteTestingInput!
    $condition: ModelTestingConditionInput
  ) {
    deleteTesting(input: $input, condition: $condition) {
      id
      name
      coordinates {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
