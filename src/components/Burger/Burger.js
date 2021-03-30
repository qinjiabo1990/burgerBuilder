import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    //console.log(Object.keys(props.ingredients))
    let transformedIngredients = Object.keys(props.ingredients).map( //return [salad, meat, bacon, cheese]
        igKey => {//igKey is each element
            //console.log(igKey)
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                return <BurgerIngredient key={igKey + i} types={igKey} />
            });
        }
    ).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient types='bread-top' />
            {transformedIngredients}
            <BurgerIngredient types='bread-bottom' />
        </div>

    )
}

export default Burger;