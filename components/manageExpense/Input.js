import { View, TextInput, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utilities/Colors';

export const Input = ({ label, inputProps, style }) => {
  const input = [styles.input];
  if (inputProps && inputProps.multiline) {
    input.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[input]} {...inputProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 16,
    marginHorizontal: 4,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    fontSize: 18,
    padding: 6,
    borderRadius: 6,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
