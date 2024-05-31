export const createFavorites = /* GraphQL */ `
  mutation CreateFavorites(
    $input: CreateFavoritesInput!
    $condition: ModelFavoritesConditionInput
  ) {
    createFavorites(input: $input, condition: $condition) {
      id
      businessID
      userID
      position
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteFavorites = /* GraphQL */ `
  mutation DeleteFavorites(
    $input: DeleteFavoritesInput!
    $condition: ModelFavoritesConditionInput
  ) {
    deleteFavorites(input: $input, condition: $condition) {
      id
    }
  }
`;

export const updateFavorites = /* GraphQL */ `
  mutation UpdateFavorites(
    $input: UpdateFavoritesInput!
    $condition: ModelFavoritesConditionInput
  ) {
    updateFavorites(input: $input, condition: $condition) {
      id
      businessID
      position
    }
  }
`;

export const createComplaints = /* GraphQL */ `
  mutation CreateComplaints(
    $input: CreateComplaintsInput!
    $condition: ModelComplaintsConditionInput
  ) {
    createComplaints(input: $input, condition: $condition) {
      id
      userID
      businessID
      status
      reason
      description
    }
  }
`;

export const createBusinessComment = /* GraphQL */ `
  mutation CreateBusinessComment(
    $input: CreateBusinessCommentInput!
    $condition: ModelBusinessCommentConditionInput
  ) {
    createBusinessComment(input: $input, condition: $condition) {
      id
      userID
      businessID
      stars
      description
    }
  }
`;