export const createPromotionViews = /* GraphQL */ `
  mutation CreatePromotionViews(
    $input: CreatePromotionViewsInput!
    $condition: ModelPromotionViewsConditionInput
  ) {
    createPromotionViews(input: $input, condition: $condition) {
      id
      userID
      promotionID
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;