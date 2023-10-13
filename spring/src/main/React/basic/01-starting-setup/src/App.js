import React, {useState} from 'react';
import ExpenseItem from './components/Expenses/ExpenseItem';
import Expenses from  './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const INITIAL_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    price: '9410',
    date: new Date(2020, 7, 14),
  },
  { 
    id: 'e2',
    title: 'New TV', 
    price: '800000', 
    date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    price: '2946700',
    date: new Date(2021, 3, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    price: '450000',
    date: new Date(2021, 5, 12),
  },
];

function App() {
  
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  const addExpenseHandler = expense => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses}>원</Expenses>

    </div>
  );
}

export default App;
