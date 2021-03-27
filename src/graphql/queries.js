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
export const getScoresTest1 = /* GraphQL */ `
  query GetScoresTest1($id: ID!) {
    getScoresTest1(id: $id) {
      id
      username
      age
      sleephours
      sleepScore
      gender
      meanCongruent
      meanIncongruent
      meanCongruentN
      meanIncongruentN
      meanCongruentC
      meanIncongruentC
      meanCongruentTD
      meanIncongruentTD
      meanCongruentS
      meanIncongruentS
      CongruentAnswer
      IncongruentAnswer
      CongruentNAnswer
      IncongruentNAnswer
      CongruentCAnswer
      IncongruentCAnswer
      CongruentTDAnswer
      IncongruentTDAnswer
      CongruentSAnswer
      IncongruentSAnswer
      basetype
      createdAt
      updatedAt
    }
  }
`;
export const listScoresTest1s = /* GraphQL */ `
  query ListScoresTest1s(
    $filter: ModelScoresTest1FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScoresTest1s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        age
        sleephours
        sleepScore
        gender
        meanCongruent
        meanIncongruent
        meanCongruentN
        meanIncongruentN
        meanCongruentC
        meanIncongruentC
        meanCongruentTD
        meanIncongruentTD
        meanCongruentS
        meanIncongruentS
        CongruentAnswer
        IncongruentAnswer
        CongruentNAnswer
        IncongruentNAnswer
        CongruentCAnswer
        IncongruentCAnswer
        CongruentTDAnswer
        IncongruentTDAnswer
        CongruentSAnswer
        IncongruentSAnswer
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getScoreTest2 = /* GraphQL */ `
  query GetScoreTest2($id: ID!) {
    getScoreTest2(id: $id) {
      id
      username
      age
      sleephours
      sleepScore
      gender
      correctAnswer
      wrongAnswer
      bigjumpNoAns
      smallJumpNoAns
      bigJumpRightAns
      smallJumpRightAns
      bigJumpWrong
      smallJumpWrong
      trials
      basetype
      createdAt
      updatedAt
    }
  }
`;
export const listScoreTest2s = /* GraphQL */ `
  query ListScoreTest2s(
    $filter: ModelScoreTest2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScoreTest2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        age
        sleephours
        sleepScore
        gender
        correctAnswer
        wrongAnswer
        bigjumpNoAns
        smallJumpNoAns
        bigJumpRightAns
        smallJumpRightAns
        bigJumpWrong
        smallJumpWrong
        trials
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getScoreTest3 = /* GraphQL */ `
  query GetScoreTest3($id: ID!) {
    getScoreTest3(id: $id) {
      id
      username
      age
      sleephours
      sleepScore
      gender
      correctAnswer
      correctAnswerTime
      wrongAnswer
      wrongAnswerTime
      almostCorrectAnswer
      almostCorrectAnswerTime
      basetype
      createdAt
      updatedAt
    }
  }
`;
export const listScoreTest3s = /* GraphQL */ `
  query ListScoreTest3s(
    $filter: ModelScoreTest3FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScoreTest3s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        age
        sleephours
        sleepScore
        gender
        correctAnswer
        correctAnswerTime
        wrongAnswer
        wrongAnswerTime
        almostCorrectAnswer
        almostCorrectAnswerTime
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
export const scoresByUsernameTest1 = /* GraphQL */ `
  query ScoresByUsernameTest1(
    $basetype: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScoresTest1FilterInput
    $limit: Int
    $nextToken: String
  ) {
    ScoresByUsernameTest1(
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
        age
        sleephours
        sleepScore
        gender
        meanCongruent
        meanIncongruent
        meanCongruentN
        meanIncongruentN
        meanCongruentC
        meanIncongruentC
        meanCongruentTD
        meanIncongruentTD
        meanCongruentS
        meanIncongruentS
        CongruentAnswer
        IncongruentAnswer
        CongruentNAnswer
        IncongruentNAnswer
        CongruentCAnswer
        IncongruentCAnswer
        CongruentTDAnswer
        IncongruentTDAnswer
        CongruentSAnswer
        IncongruentSAnswer
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const scoresByUsernameTest2 = /* GraphQL */ `
  query ScoresByUsernameTest2(
    $basetype: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScoreTest2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    ScoresByUsernameTest2(
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
        age
        sleephours
        sleepScore
        gender
        correctAnswer
        wrongAnswer
        bigjumpNoAns
        smallJumpNoAns
        bigJumpRightAns
        smallJumpRightAns
        bigJumpWrong
        smallJumpWrong
        trials
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const scoresByUsernameTest3 = /* GraphQL */ `
  query ScoresByUsernameTest3(
    $basetype: String
    $username: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelScoreTest3FilterInput
    $limit: Int
    $nextToken: String
  ) {
    ScoresByUsernameTest3(
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
        age
        sleephours
        sleepScore
        gender
        correctAnswer
        correctAnswerTime
        wrongAnswer
        wrongAnswerTime
        almostCorrectAnswer
        almostCorrectAnswerTime
        basetype
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
