import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/UI/Button';
import { IconButton } from '../components/UI/IconButton';

import { GlobalStyles } from '../utilities/Colors';

export const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditable = !!expenseId;

  const handleDeleteItem = () => {};
  const handleCancelButton = () => {};
  const handleConfirmButton = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditable ? 'Edit Expense' : 'Add Expense',
    });
  }, [expenseId, isEditable, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={handleCancelButton}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={handleConfirmButton}>
          {isEditable ? 'Upadate' : 'Add'}
        </Button>
      </View>
      {isEditable && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={34}
            color={GlobalStyles.colors.error500}
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
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
