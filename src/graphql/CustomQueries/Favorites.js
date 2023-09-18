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