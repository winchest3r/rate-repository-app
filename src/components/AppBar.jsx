import Constants from 'expo-constants';
import { View, StyleSheet, ScrollView } from 'react-native';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColors.appBarPrimary,
  },
});

const AppBar = () => {

  return (
    <View style={styles.container}>
      <ScrollView pagingEnabled horizontal>
        <AppBarTab text="Repositories" link="/" />
        <AppBarTab text="Sign In" link="/signIn" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
