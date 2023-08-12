/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchByDistance = /* GraphQL */ `
  query SearchByDistance($location: LocationInput!, $km: Int) {
    searchByDistance(location: $location, km: $km) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      total
      nextToken
    }
  }
`;
export const getTags = /* GraphQL */ `
  query GetTags($id: ID!) {
    getTags(id: $id) {
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
      tags {
        nextToken
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
        createdAt
        updatedAt
      }
      nextToken
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
      }
      nextToken
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
      }
      nextToken
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
      latitude
      longitude
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
        longitude
        activity
        tags
        owner
        createdAt
        updatedAt
      }
      nextToken
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
        longitude
        activity
        tags
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
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        latitude
        longitude
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
      }
      nextToken
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
      }
      nextToken
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
      description
      status
      createdAt
      updatedAt
      owner
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
export const getTesting = /* GraphQL */ `
  query GetTesting($id: ID!) {
    getTesting(id: $id) {
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
export const listTestings = /* GraphQL */ `
  query ListTestings(
    $filter: ModelTestingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTestings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchTestings = /* GraphQL */ `
  query SearchTestings(
    $filter: SearchableTestingFilterInput
    $sort: [SearchableTestingSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTestingAggregationInput]
  ) {
    searchTestings(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
