/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchByDistance = /* GraphQL */ `
  query SearchByDistance($location: LocationInput!, $km: Int) {
    searchByDistance(location: $location, km: $km) {
      items {
        id
        name
        coordinates {
          lat
          lon
        }
        createdAt
        updatedAt
      }
      total
      nextToken
    }
  }
`;
export const searchBusinessByDistance = /* GraphQL */ `
  query SearchBusinessByDistance(
    $location: LocationInput!
    $km: Float
    $text: String!
  ) {
    searchBusinessByDistance(location: $location, km: $km, text: $text) {
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
          owner
          createdAt
          updatedAt
        }
        identityID
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
        createdAt
        updatedAt
        owner
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
        items {
          id
          tagsId
          activityId
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
        objects {
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
      tags {
        items {
          id
          tagsId
          activityId
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
        tags {
          nextToken
        }
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
        objects {
          nextToken
        }
        createdAt
        updatedAt
      }
      activity {
        id
        name
        tags {
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
          identityID
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
      identityID
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
          owner
          createdAt
          updatedAt
        }
        identityID
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
        createdAt
        updatedAt
        owner
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
        identityID
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchBusinesses = /* GraphQL */ `
  query SearchBusinesses(
    $filter: SearchableBusinessFilterInput
    $sort: [SearchableBusinessSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableBusinessAggregationInput]
  ) {
    searchBusinesses(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
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
          owner
          createdAt
          updatedAt
        }
        identityID
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
        createdAt
        updatedAt
        owner
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
          owner
          createdAt
          updatedAt
        }
        identityID
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
          identityID
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
          identityID
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
        business {
          id
          userID
          identityID
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
        coordinates {
          lat
          lon
        }
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
        coordinates {
          lat
          lon
        }
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
