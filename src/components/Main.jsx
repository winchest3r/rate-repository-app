import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate} from 'react-router-native';

import AppBar from './AppBar';

import RepositoryList from './RepositoryList';
import RepositoryLinkView from './RepositoryLinkView';
import SignIn from './SignIn';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviewsList from './MyReviewsList';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.mainPrimary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/:id' element={<RepositoryLinkView />} />
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='createReview' element={<CreateReview />} />
        <Route path='reviews' element={<MyReviewsList />} />
      </Routes>
    </View>
  );
};

export default Main;
