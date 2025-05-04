import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Update as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const signupUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/signup', { username, email, password });
  return response.data;
};

export const addIncome = async (incomeData: any) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/addIncome', incomeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addExpense = async (expenseData: any) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/addExpense', expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addGoal = async (goalData: any) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/addGoal', goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addReminder = async (reminderData: any) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/addReminder', reminderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMonthlyIncome = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/monthlyIncome', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getMonthlyExpenses = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/monthlyExpenses', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getExpenseBreakdown = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/expenseBreakdown', {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Expecting an object with category: total pairs
  // Convert it into an array if needed by the PieChartComponent
  const breakdownObj = response.data;
  const formatted = Object.keys(breakdownObj).map(key => ({
    category: key,
    value: breakdownObj[key]
  }));
  return formatted;
};

export const getExpensesLast6Months = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/expensesLast6Months', {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Expecting an array with objects {year, month, Expenses}
  // Optionally, convert month number to month name if needed.
  return response.data;
};

export const getExpenses = async (filters: any = {}) => {
    const token = localStorage.getItem('token');
    const response = await api.get('/expenses', {
      headers: { Authorization: `Bearer ${token}` },
      params: filters
    });
    return response.data;
  };

  export const getIncomes = async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/getIncomes', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  
  export const deleteIncome = async (incomeId: string) => {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/deleteIncome/${incomeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  export const deleteExpense = async (expenseId: string) => {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/deleteExpense/${expenseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  export const getAIBudgetTips = async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/aiBudgetTips', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  
  export const getAIFutureExpensePrediction = async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/aiFutureExpensePrediction', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  export const getReminders = async () => {
    const response = await axios.get("/api/reminders");
    return response.data;
  };
  
  export const removeReminder = async (id: string) => {
    await axios.delete(`/api/reminders/${id}`);
  };  

  export const getUserSavingsPercentage = async () => {
    const token = localStorage.getItem('token');
    const response = await api.get('/getUserSavingsPercentage', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  export const getGoals = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/goals", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  
  export const updateSavingsPercentage = async (savingsPercentage: number) => {
    const token = localStorage.getItem('token');
    const response = await api.put(
      '/updateSavingsPercentage',
      { savings_percentage: savingsPercentage },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  };

export default api;
