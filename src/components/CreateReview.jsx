import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.primary,
  },
  textField: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    margin: 10,
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

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required(),
  repositoryName: yup
    .string()
    .required(),
  rating: yup
    .number()
    .required()
    .min(0)
    .max(100)
    .integer(),
  review: yup
    .string()
});

const CreateReview = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data } = await mutate({variables: { review: {
        ownerName,
        rating: Number(rating),
        repositoryName,
        text: review,
      }}});
      if (data.createReview.repositoryId) {
        navigate(`/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }

  };

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      review: '',
    },
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.ownerName && formik.errors.ownerName && theme.colors.error
        }}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.ownerName}
        </Text>
      )}
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.repositoryName && formik.errors.repositoryName && theme.colors.error
        }}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.rating && formik.errors.rating && theme.colors.error
        }}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        inputMode='numeric'
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.rating}
        </Text>
      )}
      <TextInput
        style={styles.textField}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;