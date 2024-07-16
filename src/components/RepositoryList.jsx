import { FlatList, StyleSheet, View } from 'react-native';

import useRepositories from '../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
  },
});

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const renderRepoItem = ({ item }) => <RepositoryItem repo={item} />;

  return (
    <View style={styles.flexContainer}>
      <FlatList
        data={repositoryNodes}
        renderItem={renderRepoItem}
      />
    </View>
  );
};

export default RepositoryList;
