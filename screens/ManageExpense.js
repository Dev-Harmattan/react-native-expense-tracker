import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/UI/Button';
import { IconButton } from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expensesContext';
import {ExpenseForm} from '../components/manageExpense/ExpenseForm';

import { GlobalStyles } from '../utilities/Colors';

export const ManageExpense = ({ route, navigation }) => {
  const expensesContext = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditable = !!expenseId;

  const handleDeleteItem = () => {
    navigation.goBack();
    expensesContext.deleteExpense(expenseId);
  };
  const handleCancelButton = () => {
    navigation.goBack();
  };
  const handleConfirmButton = () => {
    navigation.goBack();
    if (isEditable) {
      // const updateData = expensesContext.expenses.filter(expense => expense.id === expenseId);
      expensesContext.updateExpense(expenseId, {
        description: 'test edit',
        amount: 99.9,
        date: new Date('2022/11/06'),
      });
    } else {
      expensesContext.addExpense({
        description: 'test',
        amount: 99.9,
        date: new Date('2022/11/06'),
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditable ? 'Edit Expense' : 'Add Expense',
    });
  }, [expenseId, isEditable, navigation]);

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={handleCancelButton}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirmButton}>
          {isEditable ? 'Upadate' : 'Add'}
        </Button>
      </View>
      {isEditable && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={34}
            color={GlobalStyles.colors.error500}
            onPress={handleDeleteItem}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
