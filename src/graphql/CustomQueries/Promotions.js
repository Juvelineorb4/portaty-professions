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
        __typename
      }
      nextToken
      __typename
    }
  }
`;