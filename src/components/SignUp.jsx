import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { CREATE_USER } from '../graphql/mutations';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(5)
    .max(30),
  password: yup
    .string()
    .required()
    .min(5)
    .max(30),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password doesn\'t match')
    .required('Password confirm is required')
});

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

const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await mutate({variables: {user: { username, password }}});
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.username && formik.errors.username && theme.colors.error
        }}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.password && formik.errors.password && theme.colors.error
        }}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.passwordConfirm && formik.errors.passwordConfirm && theme.colors.error
        }}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.passwordConfirm}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;
