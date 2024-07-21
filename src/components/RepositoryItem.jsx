import { View, StyleSheet, Image } from 'react-native';

import Text from './Text';

import theme from '../theme';
import { simplifyNumber } from '../utils/helpers';

const styles = StyleSheet.create({
  flexItem: {
    flexGrow: 1,
    backgroundColor: theme.backgroundColors.primary,
    marginBottom: 10,
    padding: 10,
    gap: 10,
  },
  upperBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    borderColor: theme.backgroundColors.primary,
    overflow: 'hidden',
    flexGrow: 0,
  },
  upperItem: {
    flexShrink: 1,
    gap: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    padding: 2,
    color: 'white',
  },
  lowerBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  repoStatItem: {
    display: 'flex',
    gap: 5,
  },
});

const RepoStatItem = ({ text, value }) => {
  return (
    <View style={styles.repoStatItem}>
      <Text style={{textAlign: 'center'}} fontWeight='bold'>{simplifyNumber(value)}</Text>
      <Text style={{textAlign: 'center'}} color='textSecondary'>{text}</Text>
    </View>
  );
};

const RepositoryItem = ({ repo }) => {
  return (
    <View style={styles.flexItem} testID="repositoryItem">
      <View style={styles.upperBox}>
        <View style={styles.upperItem}>
          <Text fontSize='subheading' fontWeight='bold'>{repo.fullName}</Text>
          <Text color='textSecondary'>{repo.description}</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={styles.language}>{repo.language}</Text>
          </View>
        </View>
        <View style={{flexGrow: 1}}></View>
        <View style={styles.image}>
          <Image
            source={{uri: repo.ownerAvatarUrl}}
            style={{width: 70, height: 70, borderRadius: 10 }}
          />
        </View>
      </View>
      <View style={styles.lowerBox}>
        <RepoStatItem text='Forks' value={repo.forksCount} />
        <RepoStatItem text='Stars' value={repo.stargazersCount} />
        <RepoStatItem text='Rating' value={repo.ratingAverage} />
        <RepoStatItem text='Reviews' value={repo.reviewCount} />
      </View>
    </View>
  );
};

export default RepositoryItem;
