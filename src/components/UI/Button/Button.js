import React from 'react'
import './Button.css';

const Button =(props)=> {
    return (
        <button className={[props.btntype +" "+ props.button]} 
        onClick={props.clicked}
        >
          {props.children}
        </button>
    )
}
export default Button;