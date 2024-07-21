import { StyleSheet, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';

import theme from '../theme';

import RepositoryItemView from './RepositoryItemView';

const styles = StyleSheet.create({
  flexItem: {
    flexGrow: 1,
    backgroundColor: theme.backgroundColors.primary,
    marginBottom: 10,
    padding: 10,
    gap: 10,
  },
});

const RepositoryItem = ({ repo }) => {
  const navigate = useNavigate();

  const press = () => {
    navigate(`/${repo.id}`);
  }

  return (
    <View style={styles.flexItem} testID="repositoryItem">
      <Pressable onPress={press} >
        <RepositoryItemView repo={repo} />
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
