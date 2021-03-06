import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummery extends Component {
    //lifecycle hook
    componentDidUpdate() {
        console.log('[OrderSummary] will update')
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                );
            }
        );

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Your delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummery;