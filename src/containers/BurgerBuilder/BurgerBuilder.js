import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummary/OrderSummery'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandle from '../../hoc/withErrorHandle/withErrorHandle'

const INGREDIENT_PRICE = {
    salad: 0.8,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.3
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    }


    //componentDidMount is a good way to fetch data
    componentDidMount() {
        axios.get('https://react-my-burger-ecc19-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            });
    }

    //////////////
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey] //el is the value we get from here.
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ ingredients: updatedIngredients, totalPrice: newPrice })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        })
    }

    purchaseContinueHandler = () => {
        //alert('you continue')
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Bob',
                address: {
                    Street: '68 Benson St',
                    Country: 'Australia',
                    postcode: 4066,
                }
            },
            delivery: 'Express'
        }

        axios.post('/order.json', order).then(
            response => { this.setState({ loading: false, purchasing: false }) }
        ).catch(
            error => { this.setState({ loading: false, purchasing: false }) }
        )
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdd={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </>
            );
            orderSummary = <OrderSummery
            totalPrice={this.state.totalPrice.toFixed(2)}
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
        />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandle(BurgerBuilder, axios);