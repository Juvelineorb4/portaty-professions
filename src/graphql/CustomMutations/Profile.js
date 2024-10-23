export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createBusiness = /* GraphQL */ `
  mutation CreateBusiness(
    $input: CreateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    createBusiness(input: $input, condition: $condition) {
      id
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
        identityID
        favorites {
          nextToken
        }
        business {
          nextToken
        }
        owner
        createdAt
        updatedAt
      }
      identityID
      name
      image
      images
      thumbnail
      email
      phone
      description
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
        items {
          id
          businessID
          userID
          position
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateBusiness = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
      id
      images
      thumbnail
    }
  }
`;

export const updateBusinessPage = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
      id
      name
      email
      phone
      whatsapp
      instagram
      facebook
      page
      activity
      description
    }
  }
`;

export const updateBusinessShedule = /* GraphQL */ `
  mutation UpdateBusiness(
    $input: UpdateBusinessInput!
    $condition: ModelBusinessConditionInput
  ) {
    updateBusiness(input: $input, condition: $condition) {
      id
      schedule
    }
  }
`;

export const createReports = /* GraphQL */ `
  mutation CreateReports(
    $input: CreateReportsInput!
    $condition: ModelReportsConditionInput
  ) {
    createReports(input: $input, condition: $condition) {
      id
      userID
      subject
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const deleteBusinessPromotion = /* GraphQL */ `
  mutation DeleteBusinessPromotion(
    $input: DeleteBusinessPromotionInput!
    $condition: ModelBusinessPromotionConditionInput
  ) {
    deleteBusinessPromotion(input: $input, condition: $condition) {
      id
      userID
    }
  }
`;

export const updateBusinessPromotion = /* GraphQL */ `
  mutation UpdateBusinessPromotion(
    $input: UpdateBusinessPromotionInput!
    $condition: ModelBusinessPromotionConditionInput
  ) {
    updateBusinessPromotion(input: $input, condition: $condition) {
      id
      status
    }
  }
`;

export const createDate = /* GraphQL */ `
  mutation CreateDate(
    $input: CreateDateInput!
    $condition: ModelDateConditionInput
  ) {
    createDate(input: $input, condition: $condition) {
      id
      userID
      businessID
      userToken
      date
      notificationMethod
      createdAt
      updatedAt
      owner
    }
  }
`;

export const createClaimRequest = /* GraphQL */ `
  mutation CreateClaimRequest(
    $input: CreateClaimRequestInput!
    $condition: ModelClaimRequestConditionInput
  ) {
    createClaimRequest(input: $input, condition: $condition) {
      id
      businessID
      userID
      status
      adminResponse
      createdAt
      updatedAt
      owner
    }
  }
`;
