export const onCreateBusinessPromotion = /* GraphQL */ `
  subscription OnCreateBusinessPromotion(
    $filter: ModelSubscriptionBusinessPromotionFilterInput
    $owner: String
  ) {
    onCreateBusinessPromotion(filter: $filter, owner: $owner) {
      id
      userID
      businessID
      title
      dateInitial
      dateFinal
      status
      image
      owner
    }
  }
`;

export const onUpdateBusinessPromotion = /* GraphQL */ `
  subscription OnUpdateBusinessPromotion(
    $filter: ModelSubscriptionBusinessPromotionFilterInput
    $owner: String
  ) {
    onUpdateBusinessPromotion(filter: $filter, owner: $owner) {
      id
    }
  }
`;