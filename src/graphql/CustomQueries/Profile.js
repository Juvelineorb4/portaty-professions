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
          items {
            tags {
              name
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
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
        name
        activities {
          items {
            name
          }
        }
      }
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
        business {
          items {
            id
            userID
            name
            image
            thumbnail
            images
            email
            phone
            description
            schedule
            whatsapp
            instagram
            facebook
            page
            favorites {
              items {
                id
              }
            }
            coordinates {
              lat
              lon
            }
            activity
            tags
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
        __typename
      }
      activity
      tags
      favorites {
        items {
          id
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
export const getBusiness2 = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      catalogpdf
      __typename
    }
  }
`;
export const getBusinessFavorites = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      favorites {
        items {
          id
        }
      }
    }
  }
`;
export const getImages = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      images
    }
  }
`;
export const getBusinessCoordinate = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      coordinates {
        lat
        lon
      }
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
        catalogpdf
        createdAt
        updatedAt
        owner
      }
      nextToken
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
        businessID
        title
        dateInitial
        dateFinal
        status
        isView
        image
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