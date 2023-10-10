import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';


function Expenses(props){
    

    return(

        <Card className="expenses">
            <ExpenseItem title={props.items[0].title} amount={props.items[0].price} date={props.items[0].date}></ExpenseItem>
            <ExpenseItem title={props.items[1].title} amount={props.items[1].price} date={props.items[1].date}></ExpenseItem>
            <ExpenseItem title={props.items[2].title} amount={props.items[2].price} date={props.items[2].date}></ExpenseItem>
            <ExpenseItem title={props.items[3].title} amount={props.items[3].price} date={props.items[3].date}></ExpenseItem>
        
        </Card>
        
    )
}

export default Expenses;