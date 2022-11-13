import { Text } from 'react-native';
import { ExpensesOutput } from '../components/expenses/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expensesContext';
import { getRecentDateMinusDays } from '../utilities/date';

export const RecentExpense = () => {
  const expenseContext = useContext(ExpensesContext);
  const todayDate = new Date();
  const recentDate = getRecentDateMinusDays(todayDate, 7);

  const recentExpenses = expenseContext.expenses.filter(
    (expense) => expense.date > recentDate
  );
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};
