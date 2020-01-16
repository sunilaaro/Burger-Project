import React from 'react';
import './IngredientControls.css';
import IngredientControl from './IngredientControl/IngredientControl';

const controls =[
    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
]

const ingredientControls = (props) =>(
     <div className="IngredientControls">
         <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
         {controls.map(ctr=>(
             <IngredientControl
              key={ctr.label}
              label={ctr.label}
              //type={ctr.type}
              added={()=>props.ingredientAdded(ctr.type)}
              remove={()=>props.ingredientRemoved(ctr.type)}
              disabled={props.disable[ctr.type]}
              
              />
         ))}
          <button className="OrderButton" 
            disabled={!props.purchaseble} onClick={props.ordered}>ORDER NOW
          </button>
     </div>  
);
export default ingredientControls;