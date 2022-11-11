import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utilities/Colors';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoe',
    amount: 94.9,
    date: new Date('2021-01-22'),
  },
  {
    id: 'e2',
    description: 'A pair of sandal',
    amount: 47.46,
    date: new Date('2021-05-02'),
  },
  {
    id: 'e3',
    description: 'Books',
    amount: 100.73,
    date: new Date('2021-08-09'),
  },
  {
    id: 'e4',
    description: 'Shirt',
    amount: 140.73,
    date: new Date('2021-11-19'),
  },
  {
    id: 'e5',
    description: 'Trouser',
    amount: 8.73,
    date: new Date('2022-02-09'),
  },
  {
    id: 'e6',
    description: 'Mansion',
    amount: 120.50,
    date: new Date('2022-08-09'),
  },
  {
    id: 'e7',
    description: 'Laptop',
    amount: 19.03,
    date: new Date('2022-10-09'),
  },
  {
    id: 'e9',
    description: 'Sterio',
    amount: 10.04,
    date: new Date('2022-10-22'),
  },
  {
    id: 'e10',
    description: 'Mansion',
    amount: 120.00,
    date: new Date('2022-08-09'),
  },
  {
    id: 'e11',
    description: 'Laptop',
    amount: 19.40,
    date: new Date('2022-10-09'),
  },
  {
    id: 'e12',
    description: 'Sterio',
    amount: 1000.23,
    date: new Date('2022-10-22'),
  },
];

export const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={DUMMY_EXPENSES} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  }
})
