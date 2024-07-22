import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';

import AppBarTab from './AppBarTab';
import theme from '../theme';
import { GET_ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.appBarPrimary,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  return (
    <View style={styles.container}>
      <ScrollView pagingEnabled horizontal>
        <AppBarTab text="Repositories" link="/" />
        {data.me
          ? <AppBarTab text="Sign Out" onPress={logout} link="/signIn" />
          : <AppBarTab text="Sign In" link="/signIn" />
        }
        {data.me
          ? <AppBarTab text="Create a review" link="/createReview" />
          : null
        }
        {!data.me
          ? <AppBarTab text="Sign up" link="/signUp" />
          : null
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;
