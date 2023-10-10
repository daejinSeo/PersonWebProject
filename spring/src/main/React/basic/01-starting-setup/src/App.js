import ExpenseItem from './components/Expenses/ExpenseItem';
import Expenses from  './components/Expenses/Expenses';

function App() {
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      price: '9,410원',
      date: new Date(2020, 7, 14),
    },
    { 
      id: 'e2',
      title: 'New TV', 
      price: '800,000원', 
      date: new Date(2021, 2, 12) },
    {
      id: 'e3',
      title: 'Car Insurance',
      price: '2,946,700원',
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      price: '450,000원',
      date: new Date(2021, 5, 12),
    },
  ];

  return (
    <div>
      <Expenses items={expenses}></Expenses>

    </div>
  );
}

export default App;
