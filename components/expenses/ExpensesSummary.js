import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utilities/Colors';

export const ExpensesSummary = ({ expenses, periodName }) => {
  const totalExpenses = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${totalExpenses.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
