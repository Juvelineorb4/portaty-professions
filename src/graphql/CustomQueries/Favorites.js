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
          items {
            id
            businessID
            business {
              id
              userID
              name
              image
              images
              thumbnail
              email
              phone
              whatsapp
              description
              schedule
              instagram
              facebook
              page
              identityID
              coordinates {
                lat
                lon
              }
              activity
              favorites {
                items {
                  id
                }
              }
              tags
              createdAt
              updatedAt
              owner
              __typename
            }
            userID
            position
            owner
            createdAt
            updatedAt
            __typename
          }
        }
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
          name
          image
          email
          phone
          whatsapp
          instagram
          facebook
          page
          description
          schedule
          activity
          tags
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

export const userByEmailPosition = /* GraphQL */ `
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
        favorites {
          items {
            id
            position
          }
        }
      }
      nextToken
    }
  }
`;

export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      favorites {
        items {
          id
          business {
            id
            name
            activity
          }
        }
      }
    }
  }
`;

export const getBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      userID
      identityID
      name
      image
      images
      thumbnail
      email
      phone
      whatsapp
      instagram
      description
      schedule
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
          position
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const getPostBusiness = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      name
      thumbnail
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
        __typename
      }
      nextToken
      __typename
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
          identityID
          name
          image
          images
          thumbnail
          email
          phone
          whatsapp
          coordinates {
            lat
            lon
          }
          instagram
          facebook
          page
          activity
          tags
          description
          prefer
          schedule
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