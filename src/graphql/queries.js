/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTags = /* GraphQL */ `
  query GetTags($id: ID!) {
    getTags(id: $id) {
      id
      name
      objects {
        items {
          id
          tagsId
          objectsId
          createdAt
          updatedAt
          __typename
        }
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
        objects {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getObjects = /* GraphQL */ `
  query GetObjects($id: ID!) {
    getObjects(id: $id) {
      id
      name
      tags {
        items {
          id
          tagsId
          objectsId
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listObjects = /* GraphQL */ `
  query ListObjects(
    $filter: ModelObjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getObjectTags = /* GraphQL */ `
  query GetObjectTags($id: ID!) {
    getObjectTags(id: $id) {
      id
      tagsId
      objectsId
      tags {
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
      objects {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listObjectTags = /* GraphQL */ `
  query ListObjectTags(
    $filter: ModelObjectTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjectTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tagsId
        objectsId
        tags {
          id
          name
          createdAt
          updatedAt
          __typename
        }
        objects {
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
      nextToken
      __typename
    }
  }
`;
export const objectTagsByTagsId = /* GraphQL */ `
  query ObjectTagsByTagsId(
    $tagsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelObjectTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    objectTagsByTagsId(
      tagsId: $tagsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tagsId
        objectsId
        tags {
          id
          name
          createdAt
          updatedAt
          __typename
        }
        objects {
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
      nextToken
      __typename
    }
  }
`;
export const objectTagsByObjectsId = /* GraphQL */ `
  query ObjectTagsByObjectsId(
    $objectsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelObjectTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    objectTagsByObjectsId(
      objectsId: $objectsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        tagsId
        objectsId
        tags {
          id
          name
          createdAt
          updatedAt
          __typename
        }
        objects {
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
      favorites {
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
      business {
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
          coordinates
          object
          tags
          owner
          createdAt
          updatedAt
          __typename
        }
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
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates
      object
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
          __typename
        }
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
        user {
          id
          cognitoID
          name
          lastName
          email
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
        coordinates
        object
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
        user {
          id
          cognitoID
          name
          lastName
          email
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
        coordinates
        object
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
        user {
          id
          cognitoID
          name
          lastName
          email
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
        coordinates
        object
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
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
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
          coordinates
          object
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
          coordinates
          object
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
          coordinates
          object
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
