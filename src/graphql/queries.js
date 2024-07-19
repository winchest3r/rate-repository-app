import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName,
          language,
          description,
          ownerAvatarUrl,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;
