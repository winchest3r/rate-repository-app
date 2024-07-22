import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: order === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
      orderDirection: order === 'lowest' ? 'ASC' : 'DESC',
    }
  });

  if (loading) {
    return { repositories: null, loading, error }
  }
  if (error) {
    return { repositories: null, loading, error };
  }

  return { repositories: data.repositories, loading, error };
};

export default useRepositories;