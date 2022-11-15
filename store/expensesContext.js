import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  deleteExpense: (id) => {},
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});



const ACTION_TYPES = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  SET: 'SET',
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [{ ...action.payload }, ...state];
    case 'SET': 
      const expenses = action.payload.reverse();
      return expenses;
    case 'UPDATE':
      const updatableIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableData = state[updatableIndex];
      const updateItem = { ...updatableData, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableIndex] = updateItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
};

export const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);
  const setExpenses = (expenses) => {
    dispatch({type: ACTION_TYPES.SET, payload: expenses});
  }
  const addExpense = (expenseData) => {
    dispatch({ type: ACTION_TYPES.ADD, payload: expenseData });
  };
  const updateExpense = (id, expenseData) => {
    dispatch({
      type: ACTION_TYPES.UPDATE,
      payload: { id: id, data: expenseData },
    });
  };

  const deleteExpense = (id) => {
    dispatch({ type: ACTION_TYPES.DELETE, payload: {id: id} });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
