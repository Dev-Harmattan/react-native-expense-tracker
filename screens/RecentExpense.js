import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { ExpensesOutput } from '../components/expenses/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expensesContext';
import { getRecentDateMinusDays } from '../utilities/date';
import { fetchExpenses } from '../utilities/http';
import { LoadingOverlay } from '../components/UI/LoadingOverlay';
import { ErrorOverlay } from '../components/UI/ErrorOverlay';

export const RecentExpense = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const expenseContext = useContext(ExpensesContext);
  const todayDate = new Date();
  const recentDate = getRecentDateMinusDays(todayDate, 7);

  useEffect(() => {
    async function getExpenses() {
      try {
        const response = await fetchExpenses();
        expenseContext.setExpenses(response);
      } catch (error) {
        setError('Could not fetch Expenses')
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  const handleError = () => {
    setError(null);
  }

  if(error && !isFetching) return <ErrorOverlay message={error} />

  const recentExpenses = expenseContext.expenses.filter(
    (expense) => expense.date > recentDate
  );

  if (isFetching) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};
