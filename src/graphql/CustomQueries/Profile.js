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
        tags{
          items{
            tags{
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