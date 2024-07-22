import { useState } from 'react';
import { View } from 'react-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';

import RepositoryListContainer from './RepositoryListContainer';

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [filterQuery, setFilterQuery] = useState('');
  const [filterValue] = useDebounce(filterQuery, 500);

  let { repositories, fetchMore } = useRepositories(selectedOrder);
  
  const onEndReach = () => {
    fetchMore();
  };

  if (filterValue) {
      repositories = {
        edges: repositories.edges.filter(
          repo => repo.node.fullName.toLowerCase().match(filterValue.toLowerCase())
      )
    };
  }

  return (
    <View>
      <RepositoryListContainer
        repositories={repositories}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryList;
