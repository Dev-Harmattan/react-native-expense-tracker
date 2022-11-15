import axios from 'axios';

const baseUrl = 'https://react-expense-a6972-default-rtdb.firebaseio.com';
export const storeExpense = async (expenseData) => {
  const response = await axios.post(`${baseUrl}/expensess.json`, expenseData);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${baseUrl}/expensess.json`);

  const expenses = [];
  for (const key in response.data) {
    let expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObject);
  }
  return expenses;
};

export const updateExpense = async (id, expenseData) => {
  return await axios.put(`${baseUrl}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = async (id) => {
  await axios.delete(`${baseUrl}/expenses/${id}.json`);
};
