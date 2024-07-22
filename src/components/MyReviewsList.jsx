import { useQuery } from '@apollo/client';
import { View, FlatList } from 'react-native';

import Text from './Text';
import { GET_ME } from '../graphql/queries';
import MyReviewItem from './MyReviewItem';

const MyReviewsList = () => {
  const { data, loading, refetch } = useQuery(GET_ME);

  if (loading) {
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  const reviews = data.me.reviews.edges.map(e => e.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <MyReviewItem review={item} update={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviewsList;
