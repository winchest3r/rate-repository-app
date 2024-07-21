import { View, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

import RepositoryItemView from './RepositoryItemView';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  flexItem: {
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.primary,
    marginBottom: 10,
    padding: 10,
    gap: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    padding: 10,
  },
  buttonText: {
    color: theme.backgroundColors.primary,
    textAlign: 'center',
  },
});

const RepositoryInfo = ({ repo }) => {
  const press = () => {
    Linking.openURL(repo.url);
  };

  return (
    <View style={styles.flexItem}>
      <RepositoryItemView repo={repo} />
      <Pressable style={styles.button} onPress={press}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export default RepositoryInfo;
