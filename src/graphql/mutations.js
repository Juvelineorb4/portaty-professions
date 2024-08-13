/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const updateDeviceNotificationToken = /* GraphQL */ `
  mutation UpdateDeviceNotificationToken(
    $input: UpdateDeviceNotificationTokenInput!
    $condition: ModelDeviceNotificationTokenConditionInput
  ) {
    updateDeviceNotificationToken(input: $input, condition: $condition) {
      id
      deviceID
      notificationToken
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteDeviceNotificationToken = /* GraphQL */ `
  mutation DeleteDeviceNotificationToken(
    $input: DeleteDeviceNotificationTokenInput!
    $condition: ModelDeviceNotificationTokenConditionInput
  ) {
    deleteDeviceNotificationToken(input: $input, condition: $condition) {
      id
      deviceID
      notificationToken
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAppVersionHistory = /* GraphQL */ `
  mutation CreateAppVersionHistory(
    $input: CreateAppVersionHistoryInput!
    $condition: ModelAppVersionHistoryConditionInput
  ) {
    createAppVersionHistory(input: $input, condition: $condition) {
      id
      platform
      latestVersion
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAppVersionHistory = /* GraphQL */ `
  mutation UpdateAppVersionHistory(
    $input: UpdateAppVersionHistoryInput!
    $condition: ModelAppVersionHistoryConditionInput
  ) {
    updateAppVersionHistory(input: $input, condition: $condition) {
      id
      platform
      latestVersion
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAppVersionHistory = /* GraphQL */ `
  mutation DeleteAppVersionHistory(
    $input: DeleteAppVersionHistoryInput!
    $condition: ModelAppVersionHistoryConditionInput
  ) {
    deleteAppVersionHistory(input: $input, condition: $condition) {
      id
      platform
      latestVersion
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReports = /* GraphQL */ `
  mutation CreateReports(
    $input: CreateReportsInput!
    $condition: ModelReportsConditionInput
  ) {
    createReports(input: $input, condition: $condition) {
      id
      userID
      subject
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateReports = /* GraphQL */ `
  mutation UpdateReports(
    $input: UpdateReportsInput!
    $condition: ModelReportsConditionInput
  ) {
    updateReports(input: $input, condition: $condition) {
      id
      userID
      subject
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteReports = /* GraphQL */ `
  mutation DeleteReports(
    $input: DeleteReportsInput!
    $condition: ModelReportsConditionInput
  ) {
    deleteReports(input: $input, condition: $condition) {
      id
      userID
      subject
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBusinessComment = /* GraphQL */ `
  mutation DeleteBusinessComment(
    $input: DeleteBusinessCommentInput!
    $condition: ModelBusinessCommentConditionInput
  ) {
    deleteBusinessComment(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      businessID
      stars
      description
      createdAt
      updatedAt
      owner
      __typename
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
      status
      reason
      description
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createNotificationHistory = /* GraphQL */ `
  mutation CreateNotificationHistory(
    $input: CreateNotificationHistoryInput!
    $condition: ModelNotificationHistoryConditionInput
  ) {
    createNotificationHistory(input: $input, condition: $condition) {
      id
      title
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNotificationHistory = /* GraphQL */ `
  mutation UpdateNotificationHistory(
    $input: UpdateNotificationHistoryInput!
    $condition: ModelNotificationHistoryConditionInput
  ) {
    updateNotificationHistory(input: $input, condition: $condition) {
      id
      title
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNotificationHistory = /* GraphQL */ `
  mutation DeleteNotificationHistory(
    $input: DeleteNotificationHistoryInput!
    $condition: ModelNotificationHistoryConditionInput
  ) {
    deleteNotificationHistory(input: $input, condition: $condition) {
      id
      title
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createArea = /* GraphQL */ `
  mutation CreateArea(
    $input: CreateAreaInput!
    $condition: ModelAreaConditionInput
  ) {
    createArea(input: $input, condition: $condition) {
      id
      name
      activities {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateArea = /* GraphQL */ `
  mutation UpdateArea(
    $input: UpdateAreaInput!
    $condition: ModelAreaConditionInput
  ) {
    updateArea(input: $input, condition: $condition) {
      id
      name
      activities {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteArea = /* GraphQL */ `
  mutation DeleteArea(
    $input: DeleteAreaInput!
    $condition: ModelAreaConditionInput
  ) {
    deleteArea(input: $input, condition: $condition) {
      id
      name
      activities {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      areaID
      area {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      areaID
      area {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      areaID
      area {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
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
      gender
      notificationToken
      favorites {
        nextToken
        __typename
      }
      business {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      promotions {
        nextToken
        __typename
      }
      lastLocation {
        lat
        lon
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
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
      gender
      notificationToken
      favorites {
        nextToken
        __typename
      }
      business {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      promotions {
        nextToken
        __typename
      }
      lastLocation {
        lat
        lon
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
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
      gender
      notificationToken
      favorites {
        nextToken
        __typename
      }
      business {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      promotions {
        nextToken
        __typename
      }
      lastLocation {
        lat
        lon
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
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
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      status
      identityID
      name
      image
      images
      thumbnail
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates {
        lat
        lon
        __typename
      }
      activity
      tags
      favorites {
        nextToken
        __typename
      }
      description
      prefer
      schedule
      comments {
        nextToken
        __typename
      }
      promotions {
        nextToken
        __typename
      }
      catalogpdf
      createdAt
      updatedAt
      owner
      __typename
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
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      status
      identityID
      name
      image
      images
      thumbnail
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates {
        lat
        lon
        __typename
      }
      activity
      tags
      favorites {
        nextToken
        __typename
      }
      description
      prefer
      schedule
      comments {
        nextToken
        __typename
      }
      promotions {
        nextToken
        __typename
      }
      catalogpdf
      createdAt
      updatedAt
      owner
      __typename
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
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      status
      identityID
      name
      image
      images
      thumbnail
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates {
        lat
        lon
        __typename
      }
      activity
      tags
      favorites {
        nextToken
        __typename
      }
      description
      prefer
      schedule
      comments {
        nextToken
        __typename
      }
      promotions {
        nextToken
        __typename
      }
      catalogpdf
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createBusinessComment = /* GraphQL */ `
  mutation CreateBusinessComment(
    $input: CreateBusinessCommentInput!
    $condition: ModelBusinessCommentConditionInput
  ) {
    createBusinessComment(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      businessID
      stars
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateBusinessComment = /* GraphQL */ `
  mutation UpdateBusinessComment(
    $input: UpdateBusinessCommentInput!
    $condition: ModelBusinessCommentConditionInput
  ) {
    updateBusinessComment(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      businessID
      stars
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createBusinessPromotion = /* GraphQL */ `
  mutation CreateBusinessPromotion(
    $input: CreateBusinessPromotionInput!
    $condition: ModelBusinessPromotionConditionInput
  ) {
    createBusinessPromotion(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      businessID
      business {
        id
        userID
        status
        identityID
        name
        image
        images
        thumbnail
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        description
        prefer
        schedule
        catalogpdf
        createdAt
        updatedAt
        owner
        __typename
      }
      title
      dateInitial
      dateFinal
      status
      isView
      image
      notifiedUserIDs
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBusinessPromotion = /* GraphQL */ `
  mutation UpdateBusinessPromotion(
    $input: UpdateBusinessPromotionInput!
    $condition: ModelBusinessPromotionConditionInput
  ) {
    updateBusinessPromotion(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      businessID
      business {
        id
        userID
        status
        identityID
        name
        image
        images
        thumbnail
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        description
        prefer
        schedule
        catalogpdf
        createdAt
        updatedAt
        owner
        __typename
      }
      title
      dateInitial
      dateFinal
      status
      isView
      image
      notifiedUserIDs
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBusinessPromotion = /* GraphQL */ `
  mutation DeleteBusinessPromotion(
    $input: DeleteBusinessPromotionInput!
    $condition: ModelBusinessPromotionConditionInput
  ) {
    deleteBusinessPromotion(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      businessID
      business {
        id
        userID
        status
        identityID
        name
        image
        images
        thumbnail
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        description
        prefer
        schedule
        catalogpdf
        createdAt
        updatedAt
        owner
        __typename
      }
      title
      dateInitial
      dateFinal
      status
      isView
      image
      notifiedUserIDs
      owner
      createdAt
      updatedAt
      __typename
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
        status
        identityID
        name
        image
        images
        thumbnail
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        description
        prefer
        schedule
        catalogpdf
        createdAt
        updatedAt
        owner
        __typename
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      position
      owner
      createdAt
      updatedAt
      __typename
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
        status
        identityID
        name
        image
        images
        thumbnail
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        description
        prefer
        schedule
        catalogpdf
        createdAt
        updatedAt
        owner
        __typename
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      position
      owner
      createdAt
      updatedAt
      __typename
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
        status
        identityID
        name
        image
        images
        thumbnail
        email
        phone
        whatsapp
        instagram
        facebook
        page
        activity
        tags
        description
        prefer
        schedule
        catalogpdf
        createdAt
        updatedAt
        owner
        __typename
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        gender
        notificationToken
        owner
        createdAt
        updatedAt
        __typename
      }
      position
      owner
      createdAt
      updatedAt
      __typename
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
      status
      reason
      description
      owner
      createdAt
      updatedAt
      __typename
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
      status
      reason
      description
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReasonComplaints = /* GraphQL */ `
  mutation CreateReasonComplaints(
    $input: CreateReasonComplaintsInput!
    $condition: ModelReasonComplaintsConditionInput
  ) {
    createReasonComplaints(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateReasonComplaints = /* GraphQL */ `
  mutation UpdateReasonComplaints(
    $input: UpdateReasonComplaintsInput!
    $condition: ModelReasonComplaintsConditionInput
  ) {
    updateReasonComplaints(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteReasonComplaints = /* GraphQL */ `
  mutation DeleteReasonComplaints(
    $input: DeleteReasonComplaintsInput!
    $condition: ModelReasonComplaintsConditionInput
  ) {
    deleteReasonComplaints(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
      owner
      __typename
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
      __typename
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
      __typename
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
      __typename
    }
  }
`;
