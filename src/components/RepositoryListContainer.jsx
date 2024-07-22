import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
  },
});

const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder, filterQuery, setFilterQuery }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    const renderHeader = () => {
      return (
        <View>
          <Searchbar
            placeholder="Filter"
            onChangeText={setFilterQuery}
            value={filterQuery}
          />
          <Picker
            selectedValue={selectedOrder}
            onValueChange={value => setSelectedOrder(value)}
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Highest rated repositories" value="highest" />
            <Picker.Item label="Lowest rated repositories" value="lowest" />
          </Picker>
        </View>
      );
    }

    const renderRepoItem = ({ item }) => <RepositoryItem repo={item} />;

    return (
      <FlatList
        ListHeaderComponent={renderHeader}
        styles={styles.flexContainer}
        data={repositoryNodes}
        renderItem={renderRepoItem}
      />
    );
};

export default RepositoryListContainer;
