import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utilities/Colors';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';

export const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>
  if(expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
     {content}
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
  },
  fallbackText: {
    fontSize: 16,
    marginTop: 32,
    color: 'white',
    textAlign: 'center'
  }
})
