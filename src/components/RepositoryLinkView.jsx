import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import { View, FlatList } from 'react-native';

import Text from './Text';

import ReviewListItem from './ReviewListItem';
import RepositoryInfo from './RepositoryInfo';

import { GET_REPOSITORY } from '../graphql/queries';

const RepositoryLinkView = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network',
  });

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
    />
  );
};

export default RepositoryLinkView;
