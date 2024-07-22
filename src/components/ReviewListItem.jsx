import { View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  flexItem: {
    flexShrink: 1,
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.primary,
    marginBottom: 10,
    padding: 10,
    gap: 10,
  },
  textDescription: {
    width: 300,
  },
  rating: {
    flexBasis: 60,
    witdh: 50,
    height: 60,
  },
  ratingText: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    padding: 10,
  }
});

const ReviewListItem = ({ review }) => {
  return (
    <View style={styles.flexItem}>
      <View style={styles.rating}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{review.createdAt.split('T')[0]}</Text>
        <View style={styles.textDescription}>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

export default ReviewListItem;
