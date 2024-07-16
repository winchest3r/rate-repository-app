import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import Text from './Text';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required(),
  password: yup
    .string()
    .min(8)
    .required(),
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
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={{
          ...styles.textField,
          borderColor: formik.touched.username && formik.errors.username && theme.colors.error
        }}
        placeholder="username"
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
        secureTextEntry
        placeholder="password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ marginLeft: 10, color: theme.colors.error }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>
          Sign In
        </Text>
      </Pressable>
    </View>
  )
};

export default SignIn;