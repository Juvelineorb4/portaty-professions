export const AppVersionByDate = /* GraphQL */ `
  query AppVersionByDate(
    $platform: AppPlatform!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAppVersionHistoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AppVersionByDate(
      platform: $platform
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platform
        latestVersion
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;