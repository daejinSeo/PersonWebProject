import React, {useState} from 'react';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';


function ExpenseItem(props){
    // const expenseDate = new Date(2021, 2, 28);
    // const expenseTitle = "Car Insurance";
    // const expenseAmount = 294.67;

    const [title, setTitle] = useState(props.title);
  

    const clickHandler = () => {
        setTitle('Update');
    }

    return (
        <li>
            <Card className="expense-item">
                <ExpenseDate date={props.date} />
                <div className="expense-item__description">
                    <h2>{title}</h2>
                    <div className="expense-item__price">
                        {props.price}
                    </div>
                </div>
                <button onClick={clickHandler}>Change Title</button>
            </Card>
        </li>
       
    );
}

export default ExpenseItem;