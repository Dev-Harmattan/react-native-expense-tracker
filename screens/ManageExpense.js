import { useLayoutEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/UI/Button';
import { IconButton } from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expensesContext';
import { ExpenseForm } from '../components/manageExpense/ExpenseForm';

import { GlobalStyles } from '../utilities/Colors';
import { deleteExpense, storeExpense, updateExpense } from '../utilities/http';

export const ManageExpense = ({ route, navigation }) => {
  const expensesContext = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditable = !!expenseId;

  const defaultExpenseValue = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  const handleDeleteItem = async () => {
    navigation.goBack();
    await deleteExpense(expenseId);
    expensesContext.deleteExpense(expenseId);
  };
  const handleCancelButton = () => {
    navigation.goBack();
  };
  const handleConfirmButton = async (expenseData) => {
    navigation.goBack();
    if (isEditable) {
      expensesContext.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesContext.addExpense({id: id, ...expenseData});
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
