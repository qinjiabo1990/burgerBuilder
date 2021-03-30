import React from "react";
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad', price:'+ $0.8' },
    { label: 'Bacon', type: 'bacon', price:'+ $1.3' },
    { label: 'Cheese', type: 'cheese', price:'+ $0.5' },
    { label: 'Meat', type: 'meat', price:'+ $1.5' },
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                price={ctrl.price}
                added={() => props.ingredientAdd(ctrl.type)}
                removed={() => props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>
)

export default BuildControls;