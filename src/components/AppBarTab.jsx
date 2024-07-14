import { View, Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 25,
  },
  text: {
    color: "textSecondary",
    fontSize: "subheading",
    fontWeight: "bold",
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to={link}>
          <Text
            {...styles.text}
          >
            {text}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default AppBarTab;