import React from 'react';
import Aux from '../../../hoc/auxt';
import Button from '../../UI//Button/Button';

const orderSummary = (props)=>{

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey=>{
            return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
        });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
             <Button btntype="Success" button="Button" clicked={props.purchaseCancelled}>Cancel</Button>
             <Button btntype="Danger" button="Button" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    )

}

export default orderSummary;