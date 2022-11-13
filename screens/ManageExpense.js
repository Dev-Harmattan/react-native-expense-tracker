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

  const defaultExpenseValue = expensesContext.expenses.find(expense => expense.id === expenseId);

  const handleDeleteItem = () => {
    navigation.goBack();
    expensesContext.deleteExpense(expenseId);
  };
  const handleCancelButton = () => {
    navigation.goBack();
  };
  const handleConfirmButton = (expenseData) => {
    navigation.goBack();
    if (isEditable) {
      // const updateData = expensesContext.expenses.filter(expense => expense.id === expenseId);
      expensesContext.updateExpense(expenseId, expenseData);
    } else {
      expensesContext.addExpense(expenseData);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditable ? 'Edit Expense' : 'Add Expense',
    });
  }, [expenseId, isEditable, navigation]);

  return (
    <View style={styles.container}>
      <ExpenseForm
        buttonLabel={isEditable ? 'Upadate' : 'Add'}
        onCancel={handleCancelButton}
        onSubmit={handleConfirmButton}
        defaultValue={defaultExpenseValue}
      />
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
