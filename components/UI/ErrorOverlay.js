import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { GlobalStyles } from '../../utilities/Colors';

export const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred.</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textALign: 'center',
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
