import { Text } from 'react-native';
import {ExpensesOutput} from '../components/expenses/ExpensesOutput';

export const RecentExpense = () => {
  return <ExpensesOutput expensesPeriod="Last 7 days" />
};
