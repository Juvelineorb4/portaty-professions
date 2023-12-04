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

export const getImages = /* GraphQL */ `
  query GetBusiness($id: ID!) {
    getBusiness(id: $id) {
      id
      images
    }
  }
`;
