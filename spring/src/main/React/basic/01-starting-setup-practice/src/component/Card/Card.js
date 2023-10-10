
import CardItem from './CardItem';



function Card(props) {

    return (
        <ul id="concepts">
            <CardItem image={props.items[0].image} title={props.items[0].title} description={props.items[0].description}></CardItem>
            <CardItem image={props.items[1].image} title={props.items[1].title} description={props.items[1].description}></CardItem>
            <CardItem image={props.items[2].image} title={props.items[2].title} description={props.items[2].description}></CardItem>
        </ul>
    );
}


export default Card;