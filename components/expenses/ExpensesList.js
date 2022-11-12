import { FlatList, Text } from 'react-native';
import { ExpenseItem } from './ExpenseItems';

const renderListItem = ({ item }) => (
  <ExpenseItem
    description={item.description}
    amount={item.amount}
    date={item.date}
    id={item.id}
  />
);

export const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderListItem}
      keyExtractor={(item) => item.id}
    />
  );
};
