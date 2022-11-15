import { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';

import { Input } from './Input';
import { Button } from '../UI/Button';
import { getFormatedDate } from '../../utilities/date';
import { GlobalStyles } from '../../utilities/Colors';

export const ExpenseForm = ({
  buttonLabel,
  onCancel,
  onSubmit,
  defaultValue,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormatedDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });
  const handleInputChange = (type, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [type]: { value: value, isValid: true },
    }));
  };

  const formSubmitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const isValidAmount = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isValidDate = expenseData.date.toString() !== 'Invalid Date';
    const isValidDescription = expenseData.description.length > 0;

    if (!isValidDate || !isValidAmount || !isValidDescription) {
      setInputs((prevInputs) => ({
        amount: { value: prevInputs.amount.value, isValid: isValidAmount },
        date: { value: prevInputs.date.value, isValid: isValidDate },
        description: {
          value: prevInputs.description.value,
          isValid: isValidDescription,
        },
      }));
      return;
    }
    onSubmit(expenseData);
  };

  const isInvalidForm =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;
  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          inputProps={{
            keyboardType: 'decimal-pad',
            onChangeText: handleInputChange.bind(this, 'amount'),
            value: inputs.amount.value,
            defaultValue: inputs.amount.value,
          }}
          style={styles.inputRow}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          inputProps={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: handleInputChange.bind(this, 'date'),
            value: inputs.date.value,
            defaultValue: inputs.date.value,
          }}
          style={styles.inputRow}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        inputProps={{
          multiline: true,
          onChangeText: handleInputChange.bind(this, 'description'),
          value: inputs.description.value,
          defaultValue: inputs.description.value,
        }}
      />
      {isInvalidForm && (
        <Text style={styles.formError}>
          Invalid input entered, Please check your entered value.
        </Text>
      )}
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
  formError: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8,
  },
});
