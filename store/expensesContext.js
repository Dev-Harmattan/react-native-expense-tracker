import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  deleteExpense: (id) => {},
  addExpense: ({ description, amount, date }) => {},
  updateExpense: ({ id, description, amount, date }) => {},
});

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoe',
    amount: 94.9,
    date: new Date('2022-11-09'),
  },
  {
    id: 'e2',
    description: 'A pair of sandal',
    amount: 47.46,
    date: new Date('2022-11-07'),
  },
  {
    id: 'e3',
    description: 'Books',
    amount: 100.73,
    date: new Date('2022-11-09'),
  },
  {
    id: 'e4',
    description: 'Shirt',
    amount: 140.73,
    date: new Date('2022-11-01'),
  },
  {
    id: 'e5',
    description: 'Trouser',
    amount: 8.73,
    date: new Date('2022-11-10'),
  },
  {
    id: 'e6',
    description: 'Mansion',
    amount: 120.5,
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
    amount: 120.0,
    date: new Date('2022-08-09'),
  },
  {
    id: 'e11',
    description: 'Laptop',
    amount: 19.4,
    date: new Date('2022-10-09'),
  },
  {
    id: 'e12',
    description: 'Sterio',
    amount: 1000.23,
    date: new Date('2022-10-22'),
  },
];

const ACTION_TYPES = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload.data }, ...state];
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
      console.log('action', action.payload.id)
      return state.filter((expense) => expense.id !== action.payload.id);
    default:
      return state;
  }
};

export const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: ACTION_TYPES.ADD, payload: {data: expenseData }});
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
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
