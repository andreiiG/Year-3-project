/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getScores = /* GraphQL */ `
  query GetScores($id: ID!) {
    getScores(id: $id) {
      id
      username
      scoreTest1
      scoreTest2
      scoreTest3
      sleephours
      basetype
      createdAt
      updatedAt
    }
  }
`;
export const listScoress = /* GraphQL */ `
  query ListScoress(
    $filter: ModelScoresFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScoress(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        scoreTest1
        scoreTest2
        scoreTest3
        sleephours
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const scoresByUsernameAndBaseType = /* GraphQL */ `
  query ScoresByUsernameAndBaseType(
    $basetype: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScoresFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ScoresByUsernameAndBaseType(
      basetype: $basetype
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        scoreTest1
        scoreTest2
        scoreTest3
        sleephours
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
