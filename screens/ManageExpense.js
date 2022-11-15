import { useLayoutEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/UI/Button';
import { IconButton } from '../components/UI/IconButton';
import { ExpensesContext } from '../store/expensesContext';
import { ExpenseForm } from '../components/manageExpense/ExpenseForm';

import { GlobalStyles } from '../utilities/Colors';
import { deleteExpense, storeExpense, updateExpense } from '../utilities/http';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { ErrorOverlay } from '../components/UI/ErrorOverlay';

export const ManageExpense = ({ route, navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const expensesContext = useContext(ExpensesContext);
  const expenseId = route.params?.expenseId;
  const isEditable = !!expenseId;

  const defaultExpenseValue = expensesContext.expenses.find(
    (expense) => expense.id === expenseId
  );

  const handleDeleteItem = async () => {
    setIsFetching(true);
    try {
      await deleteExpense(expenseId);
      expensesContext.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense, try again later');
      setIsFetching(false);
    }
  };
  const handleCancelButton = () => {
    navigation.goBack();
  };
  const handleConfirmButton = async (expenseData) => {
    setIsFetching(true);
    try {
      if (isEditable) {
        expensesContext.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ id: id, ...expenseData });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data, please try again later.');
      setIsFetching(false)
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditable ? 'Edit Expense' : 'Add Expense',
    });
  }, [expenseId, isEditable, navigation]);

  const handleError = () => {
    setError(null);
  };

  if (error && !isFetching)
    return <ErrorOverlay message={error} onPress={handleError} />;

  if (isFetching) return <LoadingOverlay />;

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
