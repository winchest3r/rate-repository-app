import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';

import Text from './Text';
import theme from '../theme';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: theme.backgroundColors.primary,
    marginBottom: 10,
    padding: 10,
    gap: 10,
  },
  flexUpper: {
    flexShrink: 1,
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.primary,
    padding: 10,
    gap: 10,
  },
  flexLower: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.primary,
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
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: theme.backgroundColors.primary,
    textAlign: 'center',
  },
});

const MyReviewsList = ({ review, update }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const viewRepo = () => {
    navigate(`/${review.repository.id}`);
  };

  const deleteReview = () => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: async () => {
          await mutate({variables: { id: review.id }});
          update();
        }
      }
    ]);
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexUpper}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">{review.createdAt.split('T')[0]}</Text>
          <View style={styles.textDescription}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexLower}>
        <Pressable style={{ ...styles.button, width: 150 }} onPress={viewRepo}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <View style={{flexGrow: 1}}>

        </View>
        <Pressable style={{
          ...styles.button,
          borderColor: theme.colors.error,
          backgroundColor: theme.colors.error,
          width: 150
        }} onPress={deleteReview}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyReviewsList;
