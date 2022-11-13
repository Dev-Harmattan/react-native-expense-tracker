import { View, StyleSheet, Text } from 'react-native';

import { Input } from './Input';

export const ExpenseForm = () => {
  const handleTextInputChange = () => {};
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          inputProps={{
            keyboardType: 'decimal-pad',
            onChangeText: handleTextInputChange,
          }}
          style={styles.inputRow}
        />
        <Input
          label="Date"
          inputProps={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: () => {},
          }}
          style={styles.inputRow}
        />
      </View>
      <Input
        label="Description"
        inputProps={{
          multiline: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginVertical: 24
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputRow: {
    flex: 1,
  },
});
