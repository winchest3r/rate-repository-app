import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { View, FlatList } from 'react-native';

import Text from './Text';

import ReviewListItem from './ReviewListItem';
import RepositoryInfo from './RepositoryInfo';

import { GET_REPOSITORY } from '../graphql/queries';

const RepositoryLinkView = () => {
  const { id } = useParams();

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: {
      id,
      first: 8,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 8,
      },
    });
  };

  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  const reviews = data.repository.reviews.edges.map(e => e.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewListItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repo={data.repository} />}
      onEndReached={() => handleFetchMore()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryLinkView;
