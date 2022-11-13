import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Input } from './Input';
import { Button } from '../UI/Button';
import { getFormatedDate } from '../../utilities/date';

export const ExpenseForm = ({ buttonLabel, onCancel, onSubmit, defaultValue }) => {
  console.log(defaultValue);
  const [inputValues, setInputValues] = useState({
    amount: defaultValue ? defaultValue.amount.toString() : '',
    date: defaultValue ? getFormatedDate(defaultValue.date) : '',
    description: defaultValue ? defaultValue.description : '',
  });
  const handleInputChange = (type, value) => {
    console.log(type, value);
    setInputValues((prevValues) => ({
      ...prevValues,
      [type]: value,
    }));
  };

  const formSubmitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    }
    onSubmit(expenseData);
  };
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          inputProps={{
            keyboardType: 'decimal-pad',
            onChangeText: handleInputChange.bind(this, 'amount'),
            value: inputValues.amount,
            defaultValue: inputValues.amount,
          }}
          style={styles.inputRow}
        />
        <Input
          label="Date"
          inputProps={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleInputChange.bind(this, 'date'),
            value: inputValues.date,
            defaultValue: inputValues.date,
          }}
          style={styles.inputRow}
        />
      </View>
      <Input
        label="Description"
        inputProps={{
          multiline: true,
          onChangeText: handleInputChange.bind(this, 'description'),
          value: inputValues.description,
          defaultValue: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={formSubmitHandler}>
          {buttonLabel}
        </Button>
      </View>
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
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputRow: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
