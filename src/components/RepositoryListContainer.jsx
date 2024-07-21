import { FlatList, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
  },
});

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const renderRepoItem = ({ item }) => <RepositoryItem repo={item} />;

    return (
      <FlatList
        styles={styles.flexContainer}
        data={repositoryNodes}
        renderItem={renderRepoItem}
      />
    );
};

export default RepositoryListContainer;
