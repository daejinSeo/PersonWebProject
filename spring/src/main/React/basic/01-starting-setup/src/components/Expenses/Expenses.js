import React, {useState} from "react";
import ExpenseItem from './ExpenseItem';
import ExpenseFilter from '../NewExpense/ExpenseFilter';
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import Card from '../UI/Card';


function Expenses(props){
    // const [filteredYear, setFilteredYear] = useState('2020');
    // const [filterInfoText, setFilterInfoText] = useState('2019, 2021 & 2022');

    // const filterChangeHandler = selectedYear => {
    //     setFilteredYear(selectedYear);
    //     if(selectedYear === '2019'){
    //         setFilterInfoText('2020, 2021 & 2022');
    //     }
    //     else if (selectedYear === '2020'){
    //         setFilterInfoText('2019, 2021 & 2022');
    //     }
    //     else if (selectedYear === '2021'){
    //         setFilterInfoText('2019, 2020 & 2022');
    //     }
    //     else if (selectedYear === '2022'){
    //         setFilterInfoText('2019, 2020 & 2021');
    //     }
    // };

    const [filteredYear, setFilteredYear] = useState('2020');

    let filterInfoText = '2019, 2021 & 2022';
    if (filteredYear === '2019'){
        filterInfoText = '2020, 2021 & 2022';
    }
    else if (filteredYear === '2021'){
        filterInfoText = '2019, 2020 & 2022';
    }
    else {
        filterInfoText = '2019, 2020 & 2021';
    }
    
    const filterChangeHandler = (selectedYear) => {
        console.log("selectedYear: " + selectedYear);
        setFilteredYear(selectedYear);
    };

    const filteredExpenses = props.items.filter((expenses) => {
        return expenses.date.getFullYear().toString() === filteredYear;
    });

    

    return(

        <Card className="expenses">
            
            {/* <p>Data for years {filterInfoText} is hidden.</p>
            <ExpenseItem title={props.items[0].title} amount={props.items[0].price} date={props.items[0].date}></ExpenseItem>
            <ExpenseItem title={props.items[1].title} amount={props.items[1].price} date={props.items[1].date}></ExpenseItem>
            <ExpenseItem title={props.items[2].title} amount={props.items[2].price} date={props.items[2].date}></ExpenseItem>
            <ExpenseItem title={props.items[3].title} amount={props.items[3].price} date={props.items[3].date}></ExpenseItem>
            */}
            {/* {filteredExpenses.length === 0 ? 
            (<p>No expenses found.</p>) : 
            (
                filteredExpenses.map((expenses) => 
                (
                    <ExpenseItem
                        key={expenses.id}
                        title={expenses.title}
                        price={expenses.price}
                        date={expenses.date}
                    />
                ))
            )}  */}
            {/* { {props.items.map((expenses) => (
                <ExpenseItem
                key={expenses.id}
                title={expenses.title}
                price={expenses.price}
                date={expenses.date}
            />
            ))} */}
            <ExpenseFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
            <ExpensesChart expenses={filteredExpenses}/>
            <ExpensesList items={filteredExpenses}/>
        </Card>
        
    )
}

export default Expenses;