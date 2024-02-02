/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArea = /* GraphQL */ `
  subscription OnCreateArea($filter: ModelSubscriptionAreaFilterInput) {
    onCreateArea(filter: $filter) {
      id
      name
      activities {
        items {
          id
          name
          areaID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateArea = /* GraphQL */ `
  subscription OnUpdateArea($filter: ModelSubscriptionAreaFilterInput) {
    onUpdateArea(filter: $filter) {
      id
      name
      activities {
        items {
          id
          name
          areaID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteArea = /* GraphQL */ `
  subscription OnDeleteArea($filter: ModelSubscriptionAreaFilterInput) {
    onDeleteArea(filter: $filter) {
      id
      name
      activities {
        items {
          id
          name
          areaID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity($filter: ModelSubscriptionActivityFilterInput) {
    onCreateActivity(filter: $filter) {
      id
      name
      areaID
      area {
        id
        name
        activities {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity($filter: ModelSubscriptionActivityFilterInput) {
    onUpdateActivity(filter: $filter) {
      id
      name
      areaID
      area {
        id
        name
        activities {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity($filter: ModelSubscriptionActivityFilterInput) {
    onDeleteActivity(filter: $filter) {
      id
      name
      areaID
      area {
        id
        name
        activities {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers(
    $filter: ModelSubscriptionUsersFilterInput
    $owner: String
  ) {
    onCreateUsers(filter: $filter, owner: $owner) {
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
          userID
          position
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      business {
        items {
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
          instagram
          facebook
          page
          activity
          tags
          description
          prefer
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers(
    $filter: ModelSubscriptionUsersFilterInput
    $owner: String
  ) {
    onUpdateUsers(filter: $filter, owner: $owner) {
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
          userID
          position
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      business {
        items {
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
          instagram
          facebook
          page
          activity
          tags
          description
          prefer
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers(
    $filter: ModelSubscriptionUsersFilterInput
    $owner: String
  ) {
    onDeleteUsers(filter: $filter, owner: $owner) {
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
          userID
          position
          owner
          createdAt
          updatedAt
        }
        nextToken
      }
      business {
        items {
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
          instagram
          facebook
          page
          activity
          tags
          description
          prefer
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBusiness = /* GraphQL */ `
  subscription OnCreateBusiness(
    $filter: ModelSubscriptionBusinessFilterInput
    $owner: String
  ) {
    onCreateBusiness(filter: $filter, owner: $owner) {
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
      description
      prefer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateBusiness = /* GraphQL */ `
  subscription OnUpdateBusiness(
    $filter: ModelSubscriptionBusinessFilterInput
    $owner: String
  ) {
    onUpdateBusiness(filter: $filter, owner: $owner) {
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
      description
      prefer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteBusiness = /* GraphQL */ `
  subscription OnDeleteBusiness(
    $filter: ModelSubscriptionBusinessFilterInput
    $owner: String
  ) {
    onDeleteBusiness(filter: $filter, owner: $owner) {
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
      description
      prefer
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateFavorites = /* GraphQL */ `
  subscription OnCreateFavorites(
    $filter: ModelSubscriptionFavoritesFilterInput
    $owner: String
  ) {
    onCreateFavorites(filter: $filter, owner: $owner) {
      id
      businessID
      business {
        id
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
      position
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFavorites = /* GraphQL */ `
  subscription OnUpdateFavorites(
    $filter: ModelSubscriptionFavoritesFilterInput
    $owner: String
  ) {
    onUpdateFavorites(filter: $filter, owner: $owner) {
      id
      businessID
      business {
        id
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
      position
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFavorites = /* GraphQL */ `
  subscription OnDeleteFavorites(
    $filter: ModelSubscriptionFavoritesFilterInput
    $owner: String
  ) {
    onDeleteFavorites(filter: $filter, owner: $owner) {
      id
      businessID
      business {
        id
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
      position
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComplaints = /* GraphQL */ `
  subscription OnCreateComplaints(
    $filter: ModelSubscriptionComplaintsFilterInput
    $owner: String
  ) {
    onCreateComplaints(filter: $filter, owner: $owner) {
      id
      userID
      businessID
      status
      reasonID
      reason {
        id
        name
        createdAt
        updatedAt
        owner
      }
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComplaints = /* GraphQL */ `
  subscription OnUpdateComplaints(
    $filter: ModelSubscriptionComplaintsFilterInput
    $owner: String
  ) {
    onUpdateComplaints(filter: $filter, owner: $owner) {
      id
      userID
      businessID
      status
      reasonID
      reason {
        id
        name
        createdAt
        updatedAt
        owner
      }
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComplaints = /* GraphQL */ `
  subscription OnDeleteComplaints(
    $filter: ModelSubscriptionComplaintsFilterInput
    $owner: String
  ) {
    onDeleteComplaints(filter: $filter, owner: $owner) {
      id
      userID
      businessID
      status
      reasonID
      reason {
        id
        name
        createdAt
        updatedAt
        owner
      }
      description
      owner
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReasonComplaints = /* GraphQL */ `
  subscription OnCreateReasonComplaints(
    $filter: ModelSubscriptionReasonComplaintsFilterInput
    $owner: String
  ) {
    onCreateReasonComplaints(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateReasonComplaints = /* GraphQL */ `
  subscription OnUpdateReasonComplaints(
    $filter: ModelSubscriptionReasonComplaintsFilterInput
    $owner: String
  ) {
    onUpdateReasonComplaints(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteReasonComplaints = /* GraphQL */ `
  subscription OnDeleteReasonComplaints(
    $filter: ModelSubscriptionReasonComplaintsFilterInput
    $owner: String
  ) {
    onDeleteReasonComplaints(filter: $filter, owner: $owner) {
      id
      name
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateLogs = /* GraphQL */ `
  subscription OnCreateLogs($filter: ModelSubscriptionLogsFilterInput) {
    onCreateLogs(filter: $filter) {
      id
      userID
      type
      text
      businessID
      posI
      posE
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLogs = /* GraphQL */ `
  subscription OnUpdateLogs($filter: ModelSubscriptionLogsFilterInput) {
    onUpdateLogs(filter: $filter) {
      id
      userID
      type
      text
      businessID
      posI
      posE
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLogs = /* GraphQL */ `
  subscription OnDeleteLogs($filter: ModelSubscriptionLogsFilterInput) {
    onDeleteLogs(filter: $filter) {
      id
      userID
      type
      text
      businessID
      posI
      posE
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTesting = /* GraphQL */ `
  subscription OnCreateTesting($filter: ModelSubscriptionTestingFilterInput) {
    onCreateTesting(filter: $filter) {
      id
      name
      coordinates {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTesting = /* GraphQL */ `
  subscription OnUpdateTesting($filter: ModelSubscriptionTestingFilterInput) {
    onUpdateTesting(filter: $filter) {
      id
      name
      coordinates {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTesting = /* GraphQL */ `
  subscription OnDeleteTesting($filter: ModelSubscriptionTestingFilterInput) {
    onDeleteTesting(filter: $filter) {
      id
      name
      coordinates {
        lat
        lon
      }
      createdAt
      updatedAt
    }
  }
`;
