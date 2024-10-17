/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDeviceNotificationToken = /* GraphQL */ `
  query GetDeviceNotificationToken($id: ID!) {
    getDeviceNotificationToken(id: $id) {
      id
      deviceID
      notificationToken
      createdAt
      updatedAt
    }
  }
`;
export const listDeviceNotificationTokens = /* GraphQL */ `
  query ListDeviceNotificationTokens(
    $filter: ModelDeviceNotificationTokenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeviceNotificationTokens(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        deviceID
        notificationToken
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAppVersionHistory = /* GraphQL */ `
  query GetAppVersionHistory($id: ID!) {
    getAppVersionHistory(id: $id) {
      id
      platform
      latestVersion
      createdAt
      updatedAt
    }
  }
`;
export const listAppVersionHistories = /* GraphQL */ `
  query ListAppVersionHistories(
    $filter: ModelAppVersionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAppVersionHistories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platform
        latestVersion
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReports = /* GraphQL */ `
  query GetReports($id: ID!) {
    getReports(id: $id) {
      id
      userID
      subject
      description
      status
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        subject
        description
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const appVersionByDate = /* GraphQL */ `
  query AppVersionByDate(
    $platform: AppPlatform!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAppVersionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AppVersionByDate(
      platform: $platform
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platform
        latestVersion
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotificationHistory = /* GraphQL */ `
  query GetNotificationHistory($id: ID!) {
    getNotificationHistory(id: $id) {
      id
      title
      message
      createdAt
      updatedAt
    }
  }
`;
export const listNotificationHistories = /* GraphQL */ `
  query ListNotificationHistories(
    $filter: ModelNotificationHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotificationHistories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getArea = /* GraphQL */ `
  query GetArea($id: ID!) {
    getArea(id: $id) {
      id
      name
      activities {
        items {
          id
          name
          areaID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAreas = /* GraphQL */ `
  query ListAreas(
    $filter: ModelAreaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAreas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        activities {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      id
      name
      areaID
      area {
        id
        name
        activities {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listActivities = /* GraphQL */ `
  query ListActivities(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        areaID
        area {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const activitiesByAreaID = /* GraphQL */ `
  query ActivitiesByAreaID(
    $areaID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activitiesByAreaID(
      areaID: $areaID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        areaID
        area {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      cognitoID
      name
      lastName
      email
      identityID
      gender
      notificationToken
      favorites {
        items {
          id
          businessID
          userID
          position
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      business {
        items {
          id
          userID
          status
          statusOwner
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
        }
        nextToken
      }
      comments {
        items {
          id
          userID
          businessID
          stars
          description
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      promotions {
        items {
          id
          userID
          businessID
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
        }
        nextToken
      }
      notifications {
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
      lastLocation {
        lat
        lon
      }
      dates {
        items {
          id
          userID
          businessID
          date
          notificationMethod
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      claimRequests {
        items {
          id
          businessID
          userID
          status
          adminResponse
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserNotification = /* GraphQL */ `
  query GetUserNotification($id: ID!) {
    getUserNotification(id: $id) {
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
export const userNotificationsByUserID = /* GraphQL */ `
  query UserNotificationsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userNotificationsByUserID(
      userID: $userID
      sortDirection: $sortDirection
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
export const getBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
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
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      status
      statusOwner
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
      }
      activity
      tags
      favorites {
        items {
          id
          businessID
          userID
          position
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      description
      prefer
      schedule
      comments {
        items {
          id
          userID
          businessID
          stars
          description
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      promotions {
        items {
          id
          userID
          businessID
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
        }
        nextToken
      }
      catalogpdf
      dates {
        items {
          id
          userID
          businessID
          date
          notificationMethod
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      claimRequests {
        items {
          id
          businessID
          userID
          status
          adminResponse
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBusinesses = /* GraphQL */ `
  query ListBusinesses(
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinesses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        status
        statusOwner
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
        }
        activity
        tags
        favorites {
          nextToken
        }
        description
        prefer
        schedule
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        catalogpdf
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listBusinessbyUserID = /* GraphQL */ `
  query ListBusinessbyUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinessbyUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        status
        statusOwner
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
        }
        activity
        tags
        favorites {
          nextToken
        }
        description
        prefer
        schedule
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        catalogpdf
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBusinessComment = /* GraphQL */ `
  query GetBusinessComment($id: ID!) {
    getBusinessComment(id: $id) {
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
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      businessID
      stars
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBusinessComments = /* GraphQL */ `
  query ListBusinessComments(
    $filter: ModelBusinessCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinessComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        stars
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const businessCommentsByUserID = /* GraphQL */ `
  query BusinessCommentsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    businessCommentsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        stars
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const businessCommentsByBusinessID = /* GraphQL */ `
  query BusinessCommentsByBusinessID(
    $businessID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    businessCommentsByBusinessID(
      businessID: $businessID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        stars
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getBusinessPromotion = /* GraphQL */ `
  query GetBusinessPromotion($id: ID!) {
    getBusinessPromotion(id: $id) {
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
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      businessID
      business {
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
        }
        status
        statusOwner
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
        }
        activity
        tags
        favorites {
          nextToken
        }
        description
        prefer
        schedule
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        catalogpdf
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      title
      dateInitial
      dateFinal
      status
      isView
      image
      notifiedUserIDs
      viewedUsers {
        items {
          id
          userID
          promotionID
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listBusinessPromotions = /* GraphQL */ `
  query ListBusinessPromotions(
    $filter: ModelBusinessPromotionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBusinessPromotions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        title
        dateInitial
        dateFinal
        status
        isView
        image
        notifiedUserIDs
        viewedUsers {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const businessPromotionsByUserID = /* GraphQL */ `
  query BusinessPromotionsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessPromotionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    businessPromotionsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        title
        dateInitial
        dateFinal
        status
        isView
        image
        notifiedUserIDs
        viewedUsers {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const businessPromotionsByBusinessID = /* GraphQL */ `
  query BusinessPromotionsByBusinessID(
    $businessID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessPromotionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    businessPromotionsByBusinessID(
      businessID: $businessID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        title
        dateInitial
        dateFinal
        status
        isView
        image
        notifiedUserIDs
        viewedUsers {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPromotionViews = /* GraphQL */ `
  query GetPromotionViews($id: ID!) {
    getPromotionViews(id: $id) {
      id
      userID
      promotionID
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listPromotionViews = /* GraphQL */ `
  query ListPromotionViews(
    $filter: ModelPromotionViewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPromotionViews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        promotionID
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const promotionViewsByPromotionID = /* GraphQL */ `
  query PromotionViewsByPromotionID(
    $promotionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPromotionViewsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    promotionViewsByPromotionID(
      promotionID: $promotionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        promotionID
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFavorites = /* GraphQL */ `
  query GetFavorites($id: ID!) {
    getFavorites(id: $id) {
      id
      businessID
      business {
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
        }
        status
        statusOwner
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
        }
        activity
        tags
        favorites {
          nextToken
        }
        description
        prefer
        schedule
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        catalogpdf
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        createdAt
        updatedAt
        owner
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
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
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
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $filter: ModelFavoritesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        position
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const favoritesByBusinessID = /* GraphQL */ `
  query FavoritesByBusinessID(
    $businessID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFavoritesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    favoritesByBusinessID(
      businessID: $businessID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        position
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listFavoritesbyUserID = /* GraphQL */ `
  query ListFavoritesbyUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFavoritesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavoritesbyUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        position
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComplaints = /* GraphQL */ `
  query GetComplaints($id: ID!) {
    getComplaints(id: $id) {
      id
      userID
      businessID
      status
      reason
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listComplaints = /* GraphQL */ `
  query ListComplaints(
    $filter: ModelComplaintsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComplaints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        businessID
        status
        reason
        description
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReasonComplaints = /* GraphQL */ `
  query GetReasonComplaints($id: ID!) {
    getReasonComplaints(id: $id) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listReasonComplaints = /* GraphQL */ `
  query ListReasonComplaints(
    $filter: ModelReasonComplaintsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReasonComplaints(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getLogs = /* GraphQL */ `
  query GetLogs($id: ID!) {
    getLogs(id: $id) {
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
export const listLogs = /* GraphQL */ `
  query ListLogs(
    $filter: ModelLogsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getDate = /* GraphQL */ `
  query GetDate($id: ID!) {
    getDate(id: $id) {
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
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      businessID
      business {
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
        }
        status
        statusOwner
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
        }
        activity
        tags
        favorites {
          nextToken
        }
        description
        prefer
        schedule
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        catalogpdf
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      date
      notificationMethod
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listDates = /* GraphQL */ `
  query ListDates(
    $filter: ModelDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        date
        notificationMethod
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listDatesByUser = /* GraphQL */ `
  query ListDatesByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatesByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        date
        notificationMethod
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listDatesByBusiness = /* GraphQL */ `
  query ListDatesByBusiness(
    $businessID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelDateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDatesByBusiness(
      businessID: $businessID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        date
        notificationMethod
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getClaimRequest = /* GraphQL */ `
  query GetClaimRequest($id: ID!) {
    getClaimRequest(id: $id) {
      id
      businessID
      business {
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
        }
        status
        statusOwner
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
        }
        activity
        tags
        favorites {
          nextToken
        }
        description
        prefer
        schedule
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        catalogpdf
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        createdAt
        updatedAt
        owner
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
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        comments {
          nextToken
        }
        promotions {
          nextToken
        }
        notifications {
          nextToken
        }
        lastLocation {
          lat
          lon
        }
        dates {
          nextToken
        }
        claimRequests {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      status
      adminResponse
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listClaimRequests = /* GraphQL */ `
  query ListClaimRequests(
    $filter: ModelClaimRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClaimRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        status
        adminResponse
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listClaimsByBusiness = /* GraphQL */ `
  query ListClaimsByBusiness(
    $businessID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelClaimRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClaimsByBusiness(
      businessID: $businessID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        status
        adminResponse
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const listClaimsByUser = /* GraphQL */ `
  query ListClaimsByUser(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelClaimRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClaimsByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        business {
          id
          userID
          status
          statusOwner
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
        }
        status
        adminResponse
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
