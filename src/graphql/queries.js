/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTags = /* GraphQL */ `
  query GetTags($id: ID!) {
    getTags(id: $id) {
      id
      name
      objects {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      id
      name
      tags {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getActivityTags = /* GraphQL */ `
  query GetActivityTags($id: ID!) {
    getActivityTags(id: $id) {
      id
      tagsId
      activityId
      tags {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      activity {
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
export const listActivityTags = /* GraphQL */ `
  query ListActivityTags(
    $filter: ModelActivityTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivityTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tagsId
        activityId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const activityTagsByTagsId = /* GraphQL */ `
  query ActivityTagsByTagsId(
    $tagsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelActivityTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activityTagsByTagsId(
      tagsId: $tagsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tagsId
        activityId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const activityTagsByActivityId = /* GraphQL */ `
  query ActivityTagsByActivityId(
    $activityId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelActivityTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    activityTagsByActivityId(
      activityId: $activityId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tagsId
        activityId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
      favorites {
        nextToken
        __typename
      }
      business {
        nextToken
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
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
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        owner
        createdAt
        updatedAt
        __typename
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      latitude
      length
      activity
      tags
      favorites {
        nextToken
        __typename
      }
      owner
      createdAt
      updatedAt
      __typename
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
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        latitude
        length
        activity
        tags
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const businessesByUserID = /* GraphQL */ `
  query BusinessesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBusinessFilterInput
    $limit: Int
    $nextToken: String
  ) {
    businessesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        latitude
        length
        activity
        tags
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
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
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        latitude
        length
        activity
        tags
        owner
        createdAt
        updatedAt
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
        userID
        position
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const favoritesByBusinessID = /* GraphQL */ `
  query FavoritesByBusinessID(
    $businessID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFavoritesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    favoritesByBusinessID(
      businessID: $businessID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        userID
        position
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const favoritesByUserID = /* GraphQL */ `
  query FavoritesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFavoritesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    favoritesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        businessID
        userID
        position
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComplaints = /* GraphQL */ `
  query GetComplaints($id: ID!) {
    getComplaints(id: $id) {
      id
      userID
      businessID
      description
      status
      createdAt
      updatedAt
      owner
      __typename
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
        description
        status
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
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
      __typename
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
        __typename
      }
      nextToken
      __typename
    }
  }
`;
