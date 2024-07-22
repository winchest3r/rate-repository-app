import { gql } from '@apollo/client';

import { REPO_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderDirection: OrderDirection,
    $orderBy: AllRepositoriesOrderBy,
    $first: Int,
    $after: String
    ) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, first: $first, after: $after) {
      totalCount
      edges {
        node {
          ...RepoDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPO_DETAILS}
`;

export const GET_ME = gql`
  query {
    me {
      id
      username
      reviews {
        edges {
          node {
            id
            repository {
              fullName
              id
            }
            createdAt
            rating
            text
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int) {
    repository(id: $id) {
      ...RepoDetails
      reviews(first: $first) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPO_DETAILS}
`;
