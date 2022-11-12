import { Text } from 'react-native';
import { ExpensesOutput } from '../components/expenses/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expensesContext';

export const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expensesContext.expenses}
      fallbackText="No expense registered found!"
    />
  );
};
