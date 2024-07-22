import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order) => {
  const variables = {
    first: 4,
    orderBy: order === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE',
    orderDirection: order === 'lowest' ? 'ASC' : 'DESC',
  };

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    ...variables,
  });

  
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
  
  if (loading) {
    return { repositories: null, loading, error, fetchMore: handleFetchMore }
  }
  if (error) {
    return { repositories: null, loading, error, fetchMore: handleFetchMore };
  }

  return { 
    repositories: data.repositories,
    loading,
    error,
    fetchMore: handleFetchMore
  };
};

export default useRepositories;