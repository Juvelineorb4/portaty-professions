/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTags = /* GraphQL */ `
  subscription OnCreateTags($filter: ModelSubscriptionTagsFilterInput) {
    onCreateTags(filter: $filter) {
      id
      name
      objects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTags = /* GraphQL */ `
  subscription OnUpdateTags($filter: ModelSubscriptionTagsFilterInput) {
    onUpdateTags(filter: $filter) {
      id
      name
      objects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTags = /* GraphQL */ `
  subscription OnDeleteTags($filter: ModelSubscriptionTagsFilterInput) {
    onDeleteTags(filter: $filter) {
      id
      name
      objects {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateObjects = /* GraphQL */ `
  subscription OnCreateObjects($filter: ModelSubscriptionObjectsFilterInput) {
    onCreateObjects(filter: $filter) {
      id
      name
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateObjects = /* GraphQL */ `
  subscription OnUpdateObjects($filter: ModelSubscriptionObjectsFilterInput) {
    onUpdateObjects(filter: $filter) {
      id
      name
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteObjects = /* GraphQL */ `
  subscription OnDeleteObjects($filter: ModelSubscriptionObjectsFilterInput) {
    onDeleteObjects(filter: $filter) {
      id
      name
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateObjectTags = /* GraphQL */ `
  subscription OnCreateObjectTags(
    $filter: ModelSubscriptionObjectTagsFilterInput
  ) {
    onCreateObjectTags(filter: $filter) {
      id
      tagsId
      objectsId
      tags {
        id
        name
        createdAt
        updatedAt
      }
      objects {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateObjectTags = /* GraphQL */ `
  subscription OnUpdateObjectTags(
    $filter: ModelSubscriptionObjectTagsFilterInput
  ) {
    onUpdateObjectTags(filter: $filter) {
      id
      tagsId
      objectsId
      tags {
        id
        name
        createdAt
        updatedAt
      }
      objects {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteObjectTags = /* GraphQL */ `
  subscription OnDeleteObjectTags(
    $filter: ModelSubscriptionObjectTagsFilterInput
  ) {
    onDeleteObjectTags(filter: $filter) {
      id
      tagsId
      objectsId
      tags {
        id
        name
        createdAt
        updatedAt
      }
      objects {
        id
        name
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
        owner
        createdAt
        updatedAt
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates
      object
      tags
      favorites {
        nextToken
      }
      owner
      createdAt
      updatedAt
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
        owner
        createdAt
        updatedAt
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates
      object
      tags
      favorites {
        nextToken
      }
      owner
      createdAt
      updatedAt
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
        owner
        createdAt
        updatedAt
      }
      name
      image
      email
      phone
      whatsapp
      instagram
      facebook
      page
      coordinates
      object
      tags
      favorites {
        nextToken
      }
      owner
      createdAt
      updatedAt
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
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        coordinates
        object
        tags
        owner
        createdAt
        updatedAt
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
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
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        coordinates
        object
        tags
        owner
        createdAt
        updatedAt
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
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
        name
        image
        email
        phone
        whatsapp
        instagram
        facebook
        page
        coordinates
        object
        tags
        owner
        createdAt
        updatedAt
      }
      userID
      user {
        id
        cognitoID
        name
        lastName
        email
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
      description
      status
      createdAt
      updatedAt
      owner
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
      description
      status
      createdAt
      updatedAt
      owner
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
      description
      status
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
