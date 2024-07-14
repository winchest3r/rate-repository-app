import { View, Pressable, StyleSheet } from 'react-native';

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

const AppBarTab = ({ text }) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text
          {...styles.text}
        >
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBarTab;